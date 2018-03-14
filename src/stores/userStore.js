import { observable, action, autorun } from 'mobx';
import requests from '../requests';

class User {
    // set/delete local storage example: https://github.com/modelo/BIM_frontend-api-wrapper/blob/develop/web/stores/AppState.ts
    @observable me = {
        id: '',
        username: '',
        email: '',
        createdAt: '',
    }
    @observable user = {
        id: '',
        username: '',
        email: '',
        createdAt: '',
        projects: [],
    }

    @observable users = [];  // store project stargazers
    @observable projects = []; // store projects for "user project"/"explore page"/"user starred projects"
    @observable project = {
        id: '',
        name: '',
        description: '',
        star: '',
        isStarred: '',
        createdAt: '',
        createdBy: {
            id: '',
            username: '',
        },
        crawlers: [{
            id: '',
            name: '',
            records: [],
        }]
    };

    @action async signup(username, email, password) {
        this.me = await requests.signup(username, email, password);
    }
    
    @action async signin(email, password) {
        this.me = await requests.signin(email, password);
    }

    @action async signout() {
        requests.signout();
        this.me = {
            id: '',
            username: '',
            email: '',
            createdAt: '',
        };
    }

    @action async getMe() {
        // FIXME: assign key by key?
        const user = await requests.getMe();
        this.me = user;
    }

    @action async getUser(userId) {
        // FIXME: assign key by key?
        const user = await requests.getUser(userId);
        this.user = user;
    }

    @action async getProjects() {
        const projects = await requests.getProjects();
        this.projects = projects;
    }
    @action async getProject(id) {
        const project = await requests.getProject(id);
        this.project = project;
    }

    @action async getUserStarredProjects(userId) {
        const projects = await requests.userStarredProjects(userId);
        this.projects = projects;
    }

    @action async getProjectStargazers(projectId) {
        const users = await requests.projectStargazers(projectId);
        this.users = users;
    }
}


const me = new User();

autorun(() => {
    console.dir(me, { depth: null, colors: true });
});

export default me;