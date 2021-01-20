import {
    POST_APP_SUGGESTIONS,
    POST_TOP_CHARTS,
    POST_TRACKED_APPS,
    POST_RANK_HISTORY
} from "./values";

export default (state,action) => {
    switch (action.type) {
        case POST_APP_SUGGESTIONS:
            return {
                ...state,
                appSuggestions: action.payload
            };
        case POST_TOP_CHARTS:
            return {
                ...state,
                topChart: action.payload
            };
        case POST_TRACKED_APPS:
            return {
                ...state,
                trackedApps: action.payload
            };
        case POST_RANK_HISTORY:
            return {
                ...state,
                rankHistory: action.payload
            };
        default:
            return state;
    }
};
