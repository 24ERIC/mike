// const express = require('express');
// const puppeteer = require('puppeteer');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 5001;

// // 使用 CORS 允许跨域请求
// app.use(cors());

// // 支持 URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// // 支持 JSON-encoded bodies
// app.use(bodyParser.json());

// // 根路由提供一个简单的表单供测试
// app.get('/', (req, res) => {
//     res.send(`
//         <form action="/generate-chart" method="POST">
//             <textarea name="mermaidCode" rows="10" cols="50">flowchart TD; A-->B; B-->C; C-->D;</textarea><br>
//             <input type="submit" value="Generate Chart">
//         </form>
//     `);
// });

// // 接收 POST 请求生成 Mermaid 图表并返回图片
// app.post('/generate-chart', async (req, res) => {
//     const { mermaidCode } = req.body;
//     try {
//         const browser = await puppeteer.launch({
//             args: ['--no-sandbox', '--disable-setuid-sandbox'] // 这是为了确保在某些环境下的兼容性和安全性
//         });
//         const page = await browser.newPage();
//         await page.setContent(`
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             </head>
//             <body>
//                 <div class="mermaid">
//                     ${mermaidCode}
//                 </div>
//                 <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
//                 <script>
//                     mermaid.initialize({ startOnLoad: true });
//                 </script>
//             </body>
//             </html>
//         `);
//         await page.waitForSelector('.mermaid'); // 确保图表已渲染
//         const chartElement = await page.$('.mermaid');
//         const imageBuffer = await chartElement.screenshot({ type: 'png' });
//         await browser.close();

//         res.setHeader('Content-Type', 'image/png');
//         res.send(imageBuffer);
//     } catch (error) {
//         console.error('Error generating chart:', error);
//         res.status(500).send('Failed to generate chart');
//     }
// });




// // 启动服务器
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

// 允许跨域请求
app.use(cors());

// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// 解析application/json
app.use(bodyParser.json());

// 根路由提供一个测试表单
app.get('/', (req, res) => {
    res.send(`
        <form action="/generate-chart" method="POST">
            <textarea name="mermaidCode" rows="10" cols="50">flowchart TD; A-->B; B-->C; C-->D;</textarea><br>
            <input type="submit" value="Generate Chart">
        </form>
    `);
});

// 接收POST请求，生成Mermaid图表并返回图片
app.post('/generate-chart', async (req, res) => {
    const { mermaidCode } = req.body;
    if (!mermaidCode) {
        return res.status(400).send('Mermaid code is required');
    }
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setContent(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div class="mermaid">
                    ${mermaidCode}
                </div>
                <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
                <script>
                    mermaid.initialize({ startOnLoad: true });
                </script>
            </body>
            </html>
        `);
        await page.waitForSelector('.mermaid');
        const chartElement = await page.$('.mermaid');
        const imageBuffer = await chartElement.screenshot({ type: 'png' });
        await browser.close();

        res.setHeader('Content-Type', 'image/png');
        res.send(imageBuffer);
    } catch (error) {
        console.error('Error generating chart:', error);
        res.status(500).send('Failed to generate chart due to server error');
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
