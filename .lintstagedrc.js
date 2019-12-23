module.exports = {
    "*.js": ["npm run lint",
            "npm test -- --watchAll=false", // instead of jest "npm test" already has jest inside; watchAll=false give ability to quit from ineractive mode
            "git add"],
    "*.json": ["prettier --write", "git add"]
}