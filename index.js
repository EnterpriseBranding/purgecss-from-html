import parse5 from "parse5"

const getSelectorsInNodes = node => {
    let selectors = []
    for (let childNode of node.children) {
        if (childNode.type === "tag") {
            let tag, classes = [], ids = []
            // add tag name
            tag = childNode.name
            // add classes names
            if (childNode.attribs) {
                if (childNode.attribs.class)
                    classes = childNode.attribs.class.split(" ")
                if (childNode.attribs.id) ids = childNode.attribs.id.split(" ")
            }
            selectors = [
                ...selectors,
                tag,
                ...classes,
                ...ids,
                ...getSelectorsInNodes(childNode)
            ]
        }
    }
    return selectors
}

class PurgeFromHtml {
    static extract(content) {
        const tree = parse5.parse(content, {
            treeAdapter: parse5.treeAdapters.htmlparser2
        })
        return getSelectorsInNodes(tree)
    }
}

export default PurgeFromHtml
