import anilibriaHosts from '../../../configs/anilibriaHosts.json';

export const host = {
    api: function () {
        return anilibriaHosts.api;
    },
    player: function () {
        return anilibriaHosts.player;
    },
    storage: function () {
        return anilibriaHosts.storage;
    }
};