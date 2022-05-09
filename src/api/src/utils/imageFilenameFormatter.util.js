module.exports = async (title, mimetype) => {
    return title.split(" ").join("_") +  "." + mimetype.split("/").at(-1)
}