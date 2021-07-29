# [典型的DIV＋CSS布局——左中右版式](https://www.cnblogs.com/starxp/articles/4159903.html)

[典型的DIV＋CSS布局——固定宽度且居中的版式](http://blog.csdn.net/yousuosi/article/details/8075344)中，运用的是浮动属性；这个实例，则运用了绝对定位属性。

1、在#container中设置“position:relative;”，其作用是使得后面的绝对定位的基准为#container而不是以浏览器为其准。

2、左侧列#left_side和右侧#right_side列采用绝对定位，并且固定这两个div的宽度，而中间列#content由于需要根据浏览器自动调整，因此不设置类似属性。

但由于另外两个块的position属性设置为absolute，此时必须将它的margin-left和margin-right属性都设置为190px

 

![img](https://images0.cnblogs.com/blog/125224/201412/121554249624926.png)

 

 

**[html]** [view plain](http://blog.csdn.net/yousuosi/article/details/8199818)[copy](http://blog.csdn.net/yousuosi/article/details/8199818)[print](http://blog.csdn.net/yousuosi/article/details/8199818)[?](http://blog.csdn.net/yousuosi/article/details/8199818)

 

1. <%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" Debug="true" StylesheetTheme="Default" %> 
2.  
3. <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
4.  
5. <html xmlns="http://www.w3.org/1999/xhtml" > 
6. <head runat="server"> 
7.   <title>左中右版式</title> 
8. </head> 
9. <body> 
10.   <form id="form1" runat="server"> 
11.   <div id="wrap"> 
12. ​    <div id="header">header</div> 
13. ​    <div id="container"> 
14. ​      <div id="left_side">left_side</div> 
15. ​      <div id="content">content</div> 
16. ​      <div id="right_side">right-side</div> 
17. ​    </div> 
18. ​    <div id="footer">footer</div> 
19.   </div> 
20.   </form> 
21. </body> 
22. </html>

 

**[css]** [view plain](http://blog.csdn.net/yousuosi/article/details/8199818)[copy](http://blog.csdn.net/yousuosi/article/details/8199818)[print](http://blog.csdn.net/yousuosi/article/details/8199818)[?](http://blog.csdn.net/yousuosi/article/details/8199818)

 

1. \#wrap{ 
2.   **width:700px;** 
3.   **margin:0 auto;** 
4. } 
5. \#header{ 
6.   **margin:20px;** 
7.   **height:80px;** 
8.   **border:solid 1px #0000FF;** 
9. } 
10. \#container{ 
11.   **position:relative;** 
12.   **margin:20px;** 
13.   **height:400px;** 
14. } 
15. \#left_side{ 
16.   **position:absolute;** 
17.   top:0px; 
18.   left:0px; 
19.   **border:solid 1px #0000FF;** 
20.   **width:170px;** 
21.   **height:100%;** 
22. } 
23. \#content{ 
24.   **margin:0px 190px 0px 190px;** 
25.   **border:solid 1px #0000FF;** 
26.   **height:100%;** 
27. } 
28. \#right_side{ 
29.   **position:absolute;** 
30.   top:0px; 
31.   right:0px; 
32.   **border:solid 1px #0000FF;** 
33.   **width:170px;** 
34.   **height:100%;** 
35. } 
36. \#footer{ 
37.   **margin:20px;** 
38.   **height:80px;** 
39.   **border:solid 1px #0000FF;** 
40. 
41. } 