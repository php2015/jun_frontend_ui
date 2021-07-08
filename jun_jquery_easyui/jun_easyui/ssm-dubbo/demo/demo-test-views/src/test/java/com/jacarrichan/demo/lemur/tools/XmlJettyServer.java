package com.jacarrichan.demo.lemur.tools;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.util.resource.Resource;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.xml.XmlConfiguration;


/**
 * 开发调试使用的 Jetty Server
 * 
 * @author jacarri
 */
public class XmlJettyServer {

    public static void main(String[] args) throws Exception {
        Server server = buildNormalServer(8080, "/"); 
        // URLencoding设置(防止POST和Get请求乱码),tomcat也要设置
        server.setAttribute("org.eclipse.jetty.util.URI.charset", "UTF-8");
        server.start();
    }


    /**
     * 创建用于正常运行调试的Jetty Server, 以src/main/webapp为Web应用目录.
     * @see org.eclipse.jetty.servlet.DefaultServlet useFileMappedBuffer为false时，不开启静态文件的内存映射
     * @throws Exception
     */
    public static Server buildNormalServer(int port, String contextPath) throws Exception {
        //从配置文件中读取
        Resource fileserver_xml = Resource.newSystemResource("jetty.xml");
        XmlConfiguration configuration = new XmlConfiguration((fileserver_xml).getInputStream());
        WebAppContext webContext = (WebAppContext) configuration.configure();
        //解决请求的操作无法在使用用户映射区域打开的文件上执行。
        webContext.setInitParameter("org.eclipse.jetty.servlet.Default.useFileMappedBuffer","false");
        // ====================
        Server server = new Server(port);
        // ====================
        server.setHandler(webContext);
        server.setStopAtShutdown(true);
        return server;
    }
}
