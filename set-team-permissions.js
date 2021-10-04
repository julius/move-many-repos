const TEAM_SLUG = 'ac-masterclass';
const PERMISSION = 'pull'; // READ-ONLY
// const PERMISSION = 'push'; // READ-AND-WRITE
// const PERMISSION = 'maintain'; // ANYTHING, BUT NOT DESTRUCTIVE
// const PERMISSION = 'admin'; // FULL

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
            await octokit.request(`PUT /orgs/admiralcloud/teams/${TEAM_SLUG}/repos/admiralcloud/${repos[i]}`, {
                org: 'admiralcloud',
                team_slug: TEAM_SLUG,
                owner: 'admiralcloud',
                repo: repos[i],
                permission: PERMISSION,
            });
            console.log(repos[i]);
        } catch (e) {
            console.error('TRANSFER ERROR', e);
        }

        await new Promise((res) => setTimeout(res, 500));
    }
})();
