import {CREATE,READ,WRITE,DELETE,GENERAL,APPROVE,ROLE} from "@/constants/roles-action.js"

export const DEFAULT_ROLE_ITEM = {
    "superuser": false,
    "administrator": false,
    "user": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false,
        [APPROVE]: false,
        [ROLE]: false
    },
    "role": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "mailing": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "page": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "special_offer": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "gallery": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "faq_category": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "faq": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "auction": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "feedback": {
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "fields": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "fields_history": {
        [READ]: false
    },
    "trees": {
        [READ]: false,
        [WRITE]: false
    },
    "gifted_tree": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "locations": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "provinces": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "cooperatives": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "menu": {
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "news": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "primary_market": {
        [READ]: false,
        [WRITE]: false
    },
    "seasons": {
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "trees_import": {
        [READ]: false,
        [WRITE]: false
    },
    "transactions": {
        [READ]: false,
        [WRITE]: false,
        [CREATE]: false,
        [DELETE]: false
    },
    "payments": {
        [READ]: false,
        [WRITE]: false
    },
    "variable": {
        "value": false,
        [CREATE]: false,
        [READ]: false,
        [WRITE]: false,
        [DELETE]: false,
        "show": false
    },
    "contacts": {
        [READ]: false,
        [CREATE]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "helpers": {
        [READ]: false,
        [CREATE]: false,
        [WRITE]: false,
        [DELETE]: false
    },
    "translation": {
        [READ]: false,
        [WRITE]: false
    },
    "dashboard": {
        [GENERAL]: false
    }
}
