// creates route object
const createView = (fileName) => {
    const routeName = fileName.split(/.\/(.*)(.vue)/)[1];
    return {
        path: '/' + routeName,
        name: routeName,
        component: () => import(/* webpackChunkName: "main-routes" */ "../views/" + routeName + ".vue") // "Critical dependency: the request of a dependency is an expression"
    }
} 

// get file names in side of the view folder
const viewFileNames = require.context(
    './',
    true,
    /^.*\.vue$/
).keys();

export default viewFileNames.map((fileName) => createView(fileName));