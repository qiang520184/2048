// console.log('[ answerData ] >', answerData)
// console.log('[ paperData ] >', paperData)

function xmlToDom(xmlString) {
  var DOMParser = new window.DOMParser();
  return DOMParser.parseFromString(xmlString, 'text/xml');
}

console.log('[ answerData ] >', xmlToDom(answerData))
console.log('[ paperData ] >', xmlToDom(paperData))

console.log('[ answerData ] >', xmlToDom(answerData).childNodes)

console.log('[ paperData ] >', xmlToDom(paperData).childNodes[0])


function docToObj(dom) {
  console.log(dom, dom.nodeName)

  if (dom && ( dom.nodeType === 1 || dom.nodeType === 9)) {
    let obj = {};
    if (dom.childNodes) {
      console.log(dom.childNodes, 'dom.childNodes')
      dom.childNodes.forEach(element => {
        console.log(element, 'element')
      });
    } else {

    }

  } else {
    console.log('参数错误')
  }
}

function deepElement(elements) {
  if (elements.childNodes) {

  } else {
    let { nodeName, nodeType, nodeValue} = elements
  }
}

docToObj(xmlToDom(answerData))


