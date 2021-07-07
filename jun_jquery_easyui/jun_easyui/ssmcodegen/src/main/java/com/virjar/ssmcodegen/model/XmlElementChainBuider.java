package com.virjar.ssmcodegen.model;

import com.google.common.collect.Lists;
import org.mybatis.generator.api.dom.xml.Attribute;
import org.mybatis.generator.api.dom.xml.Element;
import org.mybatis.generator.api.dom.xml.TextElement;
import org.mybatis.generator.api.dom.xml.XmlElement;

import java.util.List;

public class XmlElementChainBuider {

    private String nodeName;
    private String textContent;
    //如果存在此参数,则append到此节点下
    private XmlElement xmlElement;
    private String textNode;
    private List<Attribute> attrs = Lists.newArrayList();
    private List<XmlElementChainBuider> builderchains = Lists.newArrayList();

    public XmlElementChainBuider(XmlElement xmlElement) {
        this.xmlElement = xmlElement;
    }

    public XmlElementChainBuider(String nodeName) {
        this.nodeName = nodeName;
    }

    public XmlElementChainBuider setName(String name) {
        this.nodeName = name;
        return this;
    }

    public XmlElementChainBuider addTextnode(String content) {
        this.textNode = content;
        return this;
    }

    public XmlElementChainBuider addContent(String content) {
        this.textContent = content;
        return this;
    }

    public XmlElementChainBuider addAttribute(String name, String value) {
        this.attrs.add(new Attribute(name, value));
        return this;
    }

    public XmlElementChainBuider addNode(XmlElementChainBuider node) {
        this.builderchains.add(node);
        return this;
    }

    public XmlElementChainBuider buildNode(XmlElement xmlElement){
        XmlElementChainBuider xmlElementChainBuider = new XmlElementChainBuider(nodeName);
        this.builderchains.add(xmlElementChainBuider);
        return xmlElementChainBuider;
    }

    public XmlElementChainBuider buildNode(String nodeName){
        XmlElementChainBuider xmlElementChainBuider = new XmlElementChainBuider(nodeName);
        this.builderchains.add(xmlElementChainBuider);
        return xmlElementChainBuider;
    }

    public static XmlElementChainBuider textNode(String textContent){
        XmlElementChainBuider xmlElementChainBuider = new XmlElementChainBuider((String)null);
        xmlElementChainBuider.addTextnode(textContent);
        return xmlElementChainBuider;
    }


    public Element build() {
        if (this.textContent != null)
            return new TextElement(textContent);

        XmlElement rootElement = xmlElement;
        if (rootElement == null) {
            rootElement = new XmlElement(nodeName);
        }

        if (this.textNode != null) {
            rootElement.addElement(new TextElement(textNode));
        }

        for (Attribute attribute : attrs) {
            rootElement.addAttribute(attribute);
        }

        for (XmlElementChainBuider builder : builderchains) {
            rootElement.addElement(builder.build());
        }
        return rootElement;
    }
}
