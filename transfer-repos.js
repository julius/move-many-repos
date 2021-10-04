const { Octokit } = require('@octokit/rest');
const credentials = require('./credentials');
const fs = require('fs');
const path = require('path');

const octokit = new Octokit({
    auth: credentials.githubToken,
});

const repos = fs
    .readFileSync(path.resolve(__dirname + '/repos.csv'), { encoding: 'utf-8' })
    .split('\n')
    .filter((name) => name !== '');

(async () => {
    for (let i = 0; i < repos.length; i++) {
        try {
            await octokit.request(`POST /repos/mmpro/${repos[i]}/transfer`, {
                owner: 'mmpro',
                repo: repos[i],
                new_owner: 'admiralcloud',
            });
        } catch (e) {
            console.error('TRANSFER ERROR', e);
        }

        await new Promise((res) => setTimeout(res, 500));
    }
})();
