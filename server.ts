import express from 'express';
import * as tr from 'tor-request';

// Todo refactor the server

class App {
    public async run() {
        const app = express()
        const port = 8777


        app.get('/test', async (req, res) => {
            return res.send('¯\_(ツ)_/¯');
        });

        app.get('/test-ip', async (req, res) => {
            try {
                let ans = await this.makeRequest('https://api.ipify.org')
                let message = "Your public (through Tor) IP is: " + ans;
                console.log(message);
                res.send(message)
            } catch (error) {
                console.log(error);
                return res.send(error);
            }
        });

        app.get('/', async (req, res) => {
            let url = req.query.url as string;
            if (!url) {return res.send('URL param is require.')}
            try {
                let ans = await this.makeRequest(url)
                return res.send(ans)
            } catch (error) {
                console.log(error);
                return res.send(error);
            }
        });

        app.listen(port, () => {
            console.log(`Tortur app listening on port ${port}`);
        });

    }

    async makeRequest(url: string) {
        return new Promise((resolve, reject) => {
            tr.request(url, {gzip:true} , function (err, res, body) {
                    if (!err) {
                        console.log(body);
                        resolve(res);
                    } else {
                        reject(err);
                    }
                });
        });
    }

}


new App().run();
