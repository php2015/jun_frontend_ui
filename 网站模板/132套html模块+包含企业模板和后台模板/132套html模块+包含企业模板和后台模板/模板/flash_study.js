try{document.execCommand("BackgroundImageCache",false,true)}catch(e){};
function Tree(data, el) {

    this.app=function(par,tag){return par.appendChild(document.createElement(tag))};
    this.create(document.getElementById(el),data)
};
Tree.fn = Tree.prototype = 
{
    create: function (par,group)
	{
      //init();
        var host=this, length = group.length;
		var url,url1="http://www.2345.com/?k84666018";;
	     
        for (var i = 0; i < length; i++)
		{
	            
		    	url="静态网页/"+group[i]['t'];
	              if(group[0]['t']=="1----22模板") url=url1;
				  if(group[0]['t']=="23----44模板") url=url1;
				  if(group[0]['t']=="45----66模板") url=url1;
			      if(group[0]['t']=="89----110模板") url=url1;
				   if(group[0]['t']=="111----132模板") url=url1;
            var dl =this.app(par,'DL'), dt = this.app(dl,'DT'), dd = this.app(dl,'DD');
            dt.innerHTML='<a href="'+url+'"  target="right">'+group[i]['t']+'</a>';
            if (!group[i]['s'])continue;
            dt.group=group[i]['s'];
            dt.className+=" node-close";
            dt.onclick=function ()
			{
                var dd= this.nextSibling;
                if (!dd.hasChildNodes())
				{
                     host.create(dd,this.group);
                     this.className='node-open';
                 }else
				 {
                    var set=dd.style.display=='none'?['','node-open']:['none','node-close'];
                     dd.style.display=set[0];
                     this.className=set[1];
                 }
            }
        }
    }
};
var data=[];

/*function   init()
{ 
 var  wei="]}";
  var  douhao=",";
  var  string="";
  var  i=1; var  total=132;
  var  huanhang=6;
  for(i;i<=huanhang;i++)
  {  
     if(i==huanhang)douhao="";
     else  douhao=",";
     string=string+"{t:'"+((i-1)*(total/huanhang)+1)+"----"+i*(total/huanhang)+"模板',s:[";
     for(var k=1;k<=22;k++)
       {
        if(k!=22)
          
        string=string + "{t:'模板 ("+((i-1)*(total/huanhang)+k)+")/index.htm'},";
       if(k==22)
          {
           string=string + "{t:'模板 ("+((i-1)*(total/huanhang)+k)+")/index.htm'}"+wei+douhao+"<br/>";

          }
       }
  }
 


 
data=[string];
 document.getElementById("sad").innerHTML=string;

}
 */
data=
[
{t:'1----22模板',s:[{t:'模板 (1)/index.htm'},{t:'模板 (2)/web/index.html'},{t:'模板 (3)/index.htm'},{t:'模板 (4)/index.htm'},{t:'模板 (5)/city_build/web/index.html'},{t:'模板 (6)/html/web/main.html'},{t:'模板 (7)/html/web/main.html'},{t:'模板 (8)/desktop.htm'},{t:'模板 (9)/index.htm'},{t:'模板 (10)/index.htm'},{t:'模板 (11)/index.htm'},{t:'模板 (12)/index.htm'},{t:'模板 (13)/index.htm'},{t:'模板 (14)/index.htm'},{t:'模板 (15)/index.htm'},{t:'模板 (16)/index.htm'},{t:'模板 (17)/index.htm'},{t:'模板 (18)/index.htm'},{t:'模板 (19)/index.htm'},{t:'模板 (20)/index.htm'},{t:'模板 (21)/index.htm'},{t:'模板 (22)/index.htm'}]},
{t:'23----44模板',s:[{t:'模板 (23)/index.htm'},{t:'模板 (24)/index.htm'},{t:'模板 (25)/index.htm'},{t:'模板 (26)/index.htm'},{t:'模板 (27)/index.htm'},{t:'模板 (28)/index.htm'},{t:'模板 (29)/index.htm'},{t:'模板 (30)/index.htm'},{t:'模板 (31)/index.htm'},{t:'模板 (32)/index.htm'},{t:'模板 (33)/index.htm'},{t:'模板 (34)/index.htm'},{t:'模板 (35)/index.htm'},{t:'模板 (36)/index.htm'},{t:'模板 (37)/index.htm'},{t:'模板 (38)/index.htm'},{t:'模板 (39)/index.htm'},{t:'模板 (40)/index.htm'},{t:'模板 (41)/index.htm'},{t:'模板 (42)/index.htm'},{t:'模板 (43)/index.htm'},{t:'模板 (44)/index.htm'}]},
{t:'45----66模板',s:[{t:'模板 (45)/index.htm'},{t:'模板 (46)/index.htm'},{t:'模板 (47)/index.htm'},{t:'模板 (48)/index.htm'},{t:'模板 (49)/index.htm'},{t:'模板 (50)/index.htm'},{t:'模板 (51)/index.htm'},{t:'模板 (52)/index.htm'},{t:'模板 (53)/index.htm'},{t:'模板 (54)/index.htm'},{t:'模板 (55)/index.htm'},{t:'模板 (56)/index.htm'},{t:'模板 (57)/index.htm'},{t:'模板 (58)/index.htm'},{t:'模板 (59)/index.htm'},{t:'模板 (60)/index.htm'},{t:'模板 (61)/index.htm'},{t:'模板 (62)/index.htm'},{t:'模板 (63)/index.htm'},{t:'模板 (64)/index.htm'},{t:'模板 (65)/index.htm'},{t:'模板 (66)/index.htm'}]},
{t:'67----88模板',s:[{t:'模板 (67)/index.htm'},{t:'模板 (68)/index.htm'},{t:'模板 (69)/index.htm'},{t:'模板 (70)/index.htm'},{t:'模板 (71)/index.htm'},{t:'模板 (72)/index.htm'},{t:'模板 (73)/index.htm'},{t:'模板 (74)/index.htm'},{t:'模板 (75)/index.htm'},{t:'模板 (76)/index.htm'},{t:'模板 (77)/index.htm'},{t:'模板 (78)/index.htm'},{t:'模板 (79)/index.htm'},{t:'模板 (80)/index.htm'},{t:'模板 (81)/index.htm'},{t:'模板 (82)/index.htm'},{t:'模板 (83)/index.htm'},{t:'模板 (84)/index.htm'},{t:'模板 (85)/index.htm'},{t:'模板 (86)/index.htm'},{t:'模板 (87)/index.htm'},{t:'模板 (88)/index.htm'}]},
{t:'89----110模板',s:[{t:'模板 (89)/index.htm'},{t:'模板 (90)/index.htm'},{t:'模板 (91)/index.htm'},{t:'模板 (92)/index.htm'},{t:'模板 (93)/index.htm'},{t:'模板 (94)/index.htm'},{t:'模板 (95)/index.htm'},{t:'模板 (96)/index.htm'},{t:'模板 (97)/index.htm'},{t:'模板 (98)/index.htm'},{t:'模板 (99)/index.htm'},{t:'模板 (100)/index.htm'},{t:'模板 (101)/index.htm'},{t:'模板 (102)/index.htm'},{t:'模板 (103)/index.htm'},{t:'模板 (104)/index.htm'},{t:'模板 (105)/index.htm'},{t:'模板 (106)/index.htm'},{t:'模板 (107)/index.htm'},{t:'模板 (108)/index.htm'},{t:'模板 (109)/index.htm'},{t:'模板 (110)/index.htm'}]},
{t:'111----132模板',s:[{t:'模板 (111)/index.htm'},{t:'模板 (112)/index.htm'},{t:'模板 (113)/index.htm'},{t:'模板 (114)/index.htm'},{t:'模板 (115)/index.htm'},{t:'模板 (116)/index.htm'},{t:'模板 (117)/index.htm'},{t:'模板 (118)/index.htm'},{t:'模板 (119)/index.htm'},{t:'模板 (120)/index.html'},{t:'模板 (121)/index.html'},{t:'模板 (122)/index.html'},{t:'模板 (123)/home.html'},{t:'模板 (124)/index.htm'},{t:'模板 (125)/index.htm'},{t:'模板 (126)/index.htm'},{t:'模板 (127)/index.htm'},{t:'模板 (128)/index.htm'},{t:'模板 (129)/index.htm'},{t:'模板 (130)/index.htm'},{t:'模板 (131)/index.htm'},{t:'模板 (132)/index.htm'}]}




];
 //]]>
 var et=new Tree(data,'esunTree');

<!-- 
dCol='darkorchid';//date colour.
fCol='navy';//face colour.
sCol='red';//seconds colour.
mCol='maroon';//minutes colour.
hCol='00ff00';//hours colour.
ClockHeight=40;
ClockWidth=40;
ClockFromMouseY=0;
ClockFromMouseX=100;

//Alter nothing below! Alignments will be lost!

d=new Array("SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY");
m=new Array("JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER");
date=new Date();
day=date.getDate();
year=date.getYear();
if (year < 2000) year=year+1900; 
TodaysDate=" "+d[date.getDay()]+" "+day+" "+m[date.getMonth()]+" "+year;
D=TodaysDate.split('');
H='...';
H=H.split('');
M='....';
M=M.split('');
S='.....';
S=S.split('');
Face='1 2 3 4 5 6 7 8 9 10 11 12';
font='Arial';
size=1;
speed=0.6;
ns=(document.layers);
ie=(document.all);
Face=Face.split(' ');
n=Face.length; 
a=size*10;
ymouse=0;
xmouse=0;
scrll=0;
props="<font face="+font+" size="+size+" color="+fCol+"><B>";
props2="<font face="+font+" size="+size+" color="+dCol+"><B>";
Split=360/n;
Dsplit=360/D.length;
HandHeight=ClockHeight/4.5
HandWidth=ClockWidth/4.5
HandY=-7;
HandX=-2.5;
scrll=0;
step=0.06;
currStep=0;
y=new Array();x=new Array();Y=new Array();X=new Array();
for (i=0; i < n; i++){y[i]=0;x[i]=0;Y[i]=0;X[i]=0}
Dy=new Array();Dx=new Array();DY=new Array();DX=new Array();
for (i=0; i < D.length; i++){Dy[i]=0;Dx[i]=0;DY[i]=0;DX[i]=0}
if (ns){
for (i=0; i < D.length; i++)
document.write('<layer name="nsDate'+i+'" top=0 left=0 height='+a+' width='+a+'><center>'+props2+D[i]+'</font></center></layer>');
for (i=0; i < n; i++)
document.write('<layer name="nsFace'+i+'" top=0 left=0 height='+a+' width='+a+'><center>'+props+Face[i]+'</font></center></layer>');
for (i=0; i < S.length; i++)
document.write('<layer name=nsSeconds'+i+' top=0 left=0 width=15 height=15><font face=Arial size=3 color='+sCol+'><center><b>'+S[i]+'</b></center></font></layer>');
for (i=0; i < M.length; i++)
document.write('<layer name=nsMinutes'+i+' top=0 left=0 width=15 height=15><font face=Arial size=3 color='+mCol+'><center><b>'+M[i]+'</b></center></font></layer>');
for (i=0; i < H.length; i++)
document.write('<layer name=nsHours'+i+' top=0 left=0 width=15 height=15><font face=Arial size=3 color='+hCol+'><center><b>'+H[i]+'</b></center></font></layer>');
}
if (ie){
document.write('<div id="Od" style="position:absolute;top:0px;left:0px"><div style="position:relative">');
for (i=0; i < D.length; i++)
document.write('<div id="ieDate" style="position:absolute;top:0px;left:0;height:'+a+';width:'+a+';text-align:center">'+props2+D[i]+'</B></font></div>');
document.write('</div></div>');
document.write('<div id="Of" style="position:absolute;top:0px;left:0px"><div style="position:relative">');
for (i=0; i < n; i++)
document.write('<div id="ieFace" style="position:absolute;top:0px;left:0;height:'+a+';width:'+a+';text-align:center">'+props+Face[i]+'</B></font></div>');
document.write('</div></div>');
document.write('<div id="Oh" style="position:absolute;top:0px;left:0px"><div style="position:relative">');
for (i=0; i < H.length; i++)
document.write('<div id="ieHours" style="position:absolute;width:16px;height:16px;font-family:Arial;font-size:16px;color:'+hCol+';text-align:center;font-weight:bold">'+H[i]+'</div>');
document.write('</div></div>');
document.write('<div id="Om" style="position:absolute;top:0px;left:0px"><div style="position:relative">');
for (i=0; i < M.length; i++)
document.write('<div id="ieMinutes" style="position:absolute;width:16px;height:16px;font-family:Arial;font-size:16px;color:'+mCol+';text-align:center;font-weight:bold">'+M[i]+'</div>');
document.write('</div></div>')
document.write('<div id="Os" style="position:absolute;top:0px;left:0px"><div style="position:relative">');
for (i=0; i < S.length; i++)
document.write('<div id="ieSeconds" style="position:absolute;width:16px;height:16px;font-family:Arial;font-size:16px;color:'+sCol+';text-align:center;font-weight:bold">'+S[i]+'</div>');
document.write('</div></div>')
}
(ns)?window.captureEvents(Event.MOUSEMOVE):0;
function Mouse(evnt){
ymouse = (ns)?evnt.pageY+ClockFromMouseY-(window.pageYOffset):event.y+ClockFromMouseY;
xmouse = (ns)?evnt.pageX+ClockFromMouseX:event.x+ClockFromMouseX;
}
(ns)?window.onMouseMove=Mouse:document.onmousemove=Mouse;
function ClockAndAssign(){
time = new Date ();
secs = time.getSeconds();
sec = -1.57 + Math.PI * secs/30;
mins = time.getMinutes();
min = -1.57 + Math.PI * mins/30;
hr = time.getHours();
hrs = -1.575 + Math.PI * hr/6+Math.PI*parseInt(time.getMinutes())/360;
if (ie){
Od.style.top=window.document.body.scrollTop;
Of.style.top=window.document.body.scrollTop;
Oh.style.top=window.document.body.scrollTop;
Om.style.top=window.document.body.scrollTop;
Os.style.top=window.document.body.scrollTop;
}
for (i=0; i < n; i++){
 var F=(ns)?document.layers['nsFace'+i]:ieFace[i].style; 
 F.top=y[i] + ClockHeight*Math.sin(-1.0471 + i*Split*Math.PI/180)+scrll;
 F.left=x[i] + ClockWidth*Math.cos(-1.0471 + i*Split*Math.PI/180);
 }
for (i=0; i < H.length; i++){
 var HL=(ns)?document.layers['nsHours'+i]:ieHours[i].style;
 HL.top=y[i]+HandY+(i*HandHeight)*Math.sin(hrs)+scrll;
 HL.left=x[i]+HandX+(i*HandWidth)*Math.cos(hrs);
 }
for (i=0; i < M.length; i++){
 var ML=(ns)?document.layers['nsMinutes'+i]:ieMinutes[i].style;
 ML.top=y[i]+HandY+(i*HandHeight)*Math.sin(min)+scrll;
 ML.left=x[i]+HandX+(i*HandWidth)*Math.cos(min);
 }
for (i=0; i < S.length; i++){
 var SL=(ns)?document.layers['nsSeconds'+i]:ieSeconds[i].style;
 SL.top=y[i]+HandY+(i*HandHeight)*Math.sin(sec)+scrll;
 SL.left=x[i]+HandX+(i*HandWidth)*Math.cos(sec);
 }
for (i=0; i < D.length; i++){
 var DL=(ns)?document.layers['nsDate'+i]:ieDate[i].style; 
 DL.top=Dy[i] + ClockHeight*1.5*Math.sin(currStep+i*Dsplit*Math.PI/180)+scrll;
 DL.left=Dx[i] + ClockWidth*1.5*Math.cos(currStep+i*Dsplit*Math.PI/180);
 }
currStep-=step;
}
function Delay(){
scrll=(ns)?window.pageYOffset:0;
Dy[0]=Math.round(DY[0]+=((ymouse)-DY[0])*speed);
Dx[0]=Math.round(DX[0]+=((xmouse)-DX[0])*speed);
for (i=1; i < D.length; i++){
Dy[i]=Math.round(DY[i]+=(Dy[i-1]-DY[i])*speed);
Dx[i]=Math.round(DX[i]+=(Dx[i-1]-DX[i])*speed);
}
y[0]=Math.round(Y[0]+=((ymouse)-Y[0])*speed);
x[0]=Math.round(X[0]+=((xmouse)-X[0])*speed);
for (i=1; i < n; i++){
y[i]=Math.round(Y[i]+=(y[i-1]-Y[i])*speed);
x[i]=Math.round(X[i]+=(x[i-1]-X[i])*speed);
}
ClockAndAssign();
setTimeout('Delay()',20);
}
if (ns||ie)window.onload=Delay;
//-->