---
title: JavaSE-反射
---

<!-- more -->

## 一、什么是反射：

（1）Java反射机制的核心是在程序运行时动态加载类并获取类的详细信息，从而操作类或对象的属性和方法。本质是JVM得到class对象之后，再通过class对象进行反编译，从而获取对象的各种信息。

（2）Java属于先编译再运行的语言，程序中对象的类型在编译期就确定下来了，而当程序在运行时可能需要动态加载某些类，这些类因为之前用不到，所以没有被加载到JVM。通过反射，可以在运行时动态地创建对象并调用其属性，不需要提前在编译期知道运行的对象是谁。

**反射是框架设计的灵魂**：（使用的前提条件：必须先得到代表的字节码的Class，Class类用于表示.class文件（字节码））

::: tip 小结

反射就是把java类中的各种成分映射成一个个的Java对象

例如：一个类有：成员变量、方法、构造方法、包等等信息，利用反射技术可以对一个类进行解剖，把各个组成部分映射成一个个对象。

:::

 

## 二、反射的原理：

如图是类的正常加载过程：反射的原理在于class对象。

加载的时候：Class对象的由来是将class文件读入内存，并为之创建一个Class对象。

![](./assets/java-02.png)

了解[类加载机制与双亲委派模型](calssloader.md)

 

## 三、反射的优缺点：

1、优点：

在运行时获得类的各种内容，进行反编译，对于Java这种先编译再运行的语言，能够让我们很方便的创建灵活的代码

这些代码可以在运行时装配，无需在组件之间进行源代码的链接，更加容易实现面向对象。

2、缺点：

（1）反射会消耗一定的系统资源，因此，如果不需要动态地创建一个对象，那么就不需要用反射；

（2）==反射调用方法时可以忽略权限检查，因此可能会破坏封装性而导致安全问题。==

 

## 四、反射的用途：

1、反编译：.class-->.java

2、通过反射机制访问java对象的属性，方法，构造方法等

3、当我们在使用IDE,比如InteliJ IDEA时，当我们输入一个对象或者类，并想调用他的属性和方法是，一按点号，编译器就会自动列出他的属性或者方法，这里就是用到反射。

4、反射最重要的用途就是开发各种通用框架。比如很多框架（Spring）都是配置化的（比如通过XML文件配置Bean），为了保证框架的通用性，他们可能需要根据配置文件加载不同的类或者对象，调用不同的方法，这个时候就必须使用到反射了，运行时动态加载需要的加载的对象。

5、比如，加载数据库驱动的，用到的也是反射。

```java
Class.forName("com.mysql.jdbc.Driver"); // 动态加载mysql驱动
```

 

## 五、反射机制常用的类

Java.lang.Class;

Java.lang.reflect.Constructor;

Java.lang.reflect.Field;

Java.lang.reflect.Method;

Java.lang.reflect.Modifier;

 

## 六、反射的基本使用

 假设我们现在有一个`Hero类`

```java
package reflect;
public class Hero {
	public String name; //昵称
    public float hp; //血量
    public float armor; //护甲
    public int moveSpeed; //移动速度
}
```

### （一）获取类对象

获取类对象有3种方式

1. `Class.forName（）`（**常用**）
2. `Hero.class`
3. `new Hero().getClass()`

在一个JVM中，一种类，只会有一个类对象存在。所以以上三种方式取出来的类对象，都是一样。

（此处准确是在ClassLoader下,只有一个类对象）

**示例：**

```java
package reflect;
public class ReflectTest {

	public static void main(String[] args) {
        String className = "reflect.Hero";
		try {
        	//获取类对象的第一种方式
            Class hClass1 = Class.forName(className);
            //获取类对象的第二种方式
            Class hClass2 = Hero.class;
            //获取类对象的第三种方式
            Class hClass3 = new Hero().getClass();
            System.out.println(hClass1==hClass2);//输出true
            System.out.println(hClass1==hClass3);//输出true
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
 }
}
```

 三种方式中，常用第一种，第二种需要导入类的包，依赖太强，不导包就抛编译错误。第三种对象都有了还要反射干什么。

一般都第一种，参数可以传入一个字符串，也可写在配置文件中等多种方法。

------

### （二）反射机制创建对象

**通过反射来生成对象主要有两种方法：**

（1）使用Class对象的newInstance()方法来创建Class对象对应类的实例。

```java
Class<?> clazz = String.class;
Object str = clazz.newInstance();
```

（2）先通过Class对象获取指定的Constructor对象，再调用Constructor对象的newInstance()方法来创建对象，这种方法可以用指定的构造器构造类的实例。

```java
//获取String的Class对象
Class<?> clazz = String.class;
//通过Class对象获取指定的Constructor构造器对象
//String.class指明构造器的形参是String类型
Constructor constructor=clazz.getConstructor(String.class);
//根据构造器创建实例：
Object obj = constructor.newInstance(“hello reflection”);
```



**演示通过构造器创建实例**

基本步骤

1、获取类对象 `Class class = Class.forName("reflect.Hero");`

2、获取构造器对象 `Constructor con = clazz.getConstructor(形参.class);`

3、获取对象 `Hero hero =con.newInstance(实参);`



上面是最简单的获取方法，当Hero的构造方法不是无参构造方法时，获取构造器对象略有不同，见下面测试：

**构造方法不同时，获取构造器对象的方法**

1、Hero类添加6种构造方法

```java
//---------------构造方法-------------------
	//（默认的构造方法）
	Hero(String str){
		System.out.println("(默认)的构造方法 s = " + str);
	}
	
	//无参构造方法
	public Hero(){
		System.out.println("调用了公有、无参构造方法执行了。。。");
	}
	
	//有一个参数的构造方法
	public Hero(char name){
		System.out.println("姓名：" + name);
	}
	
	//有多个参数的构造方法
	public Hero(String name ,float hp){
		System.out.println("姓名："+name+"血量："+ hp);
	}
	
	//受保护的构造方法
	protected Hero(boolean n){
		System.out.println("受保护的构造方法 n = " + n);
	}
	
	//私有构造方法
	private Hero(float hp){
		System.out.println("私有的构造方法   血量："+ hp);
	}
```

2、通过反射机制获取对象

```java
package reflect;

import java.lang.reflect.Constructor;

public class ConstructorTest {


	/*
	 * 通过Class对象可以获取某个类中的：构造方法、成员变量、成员方法；并访问成员；
	 *
	 * 1.获取构造方法：
	 * 		1).批量的方法：
	 * 			public Constructor[] getConstructors()：所有"公有的"构造方法
	            public Constructor[] getDeclaredConstructors()：获取所有的构造方法(包括私有、受保护、默认、公有)

	 * 		2).获取单个的方法，并调用：
	 * 			public Constructor getConstructor(Class... parameterTypes):获取单个的"公有的"构造方法：
	 * 			public Constructor getDeclaredConstructor(Class... parameterTypes):获取"某个构造方法"可以是私有的，或受保护、默认、公有；
	 *
	 * 2.创建对象
	 * 		Constructor对象调用newInstance(Object... initargs)
	 */


	public static void main(String[] args) throws Exception {
		//1.获取Class对象
		Class clazz = Class.forName("reflect.Hero");


		//2.获取所有公有构造方法
		System.out.println("**********************所有公有构造方法*********************************");
		Constructor[] conArray = clazz.getConstructors();
		for(Constructor c : conArray){
			System.out.println(c);
		}


		System.out.println("************所有的构造方法(包括：私有、受保护、默认、公有)***************");
		conArray = clazz.getDeclaredConstructors();
		for(Constructor c : conArray){
			System.out.println(c);
		}

		System.out.println("*****************获取公有、无参的构造方法*******************************");
		Constructor con = clazz.getConstructor(null);
		//1>、因为是无参的构造方法所以类型是一个null,不写也可以：这里需要的是一个参数的类型，切记是类型
		//2>、返回的是描述这个无参构造函数的类对象。
		System.out.println("con = " + con);
		//调用构造方法
		Object obj = con.newInstance();
		

		System.out.println("******************获取私有构造方法，并调用*******************************");
		con = clazz.getDeclaredConstructor(float.class);
		System.out.println(con);
		//调用构造方法
		con.setAccessible(true);//暴力访问(忽略掉访问修饰符)
		obj = con.newInstance(100);
	}


}

```

输出：

```java
**********************所有公有构造方法*********************************
public reflect.Hero(java.lang.String,float)
public reflect.Hero(char)
public reflect.Hero()
************所有的构造方法(包括：私有、受保护、默认、公有)***************
private reflect.Hero(float)
protected reflect.Hero(boolean)
public reflect.Hero(java.lang.String,float)
public reflect.Hero(char)
public reflect.Hero()
reflect.Hero(java.lang.String)
*****************获取公有、无参的构造方法*******************************
con = public reflect.Hero()
调用了公有、无参构造方法执行了。。。
******************获取私有构造方法，并调用*******************************
private reflect.Hero(float)
私有的构造方法   血量：100.0
```

::: info 小结

1.获取构造器对象方法：

1).批量的方法：

​	public Constructor[] getConstructors()：所有"公有的"构造方法
​			public Constructor[] getDeclaredConstructors()：获取所有的构造方法(包括私有、受保护、默认、公有)

2).获取单个的方法:

​	public Constructor getConstructor(Class… parameterTypes): 获取单个的"公有的"构造方法

​	public Constructor getDeclaredConstructor(Class…parameterTypes):获取"某个构造方法"可以是私有的，或受保护、默认、公有；

:::

------

### （三）获取成员变量并使用

**基本步骤**

创建HeroPlus的对象 `new/反射` 

获取属性 `Field f1 = h.getDeclaredField("属性名")`

修改属性 `f1.set(h，实参)`，注意这里的h是对象，不是类对象



1、新增HeroPlus类

```java
package reflect;
public class HeroPlus {
	public String name;
    public float hp;
    public int damage;
    public int id;
     
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public HeroPlus(){
         
    }
    public HeroPlus(String string) {
        name =string;
    }
 
    @Override
    public String toString() {
        return "Hero [name=" + name + "]";
    }
    public boolean isDead() {
        // TODO Auto-generated method stub
        return false;
    }
    public void attackHero(HeroPlus h2) {
        System.out.println(this.name+ " 正在攻击 " + h2.getName());
    }
}

```

2、获取属性并修改

```java
package reflect;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;

public class ParaTest {
	 public static void main(String[] args) {
         //HeroPlus h =new HeroPlus();
         //使用传统方式修改name的值为garen
         //h.name = "garen";

         try {
             // 获取Class对象
             Class clazz = Class.forName("reflect.HeroPlus");
             // 获取HeroPlus的无参构造函数
             Constructor con = clazz.getDeclaredConstructor(null);
             // 创建一个HeroPlus对象
             HeroPlus h = (HeroPlus) con.newInstance();
             //使用传统方式修改name的值为garen
             h.name = "garen";
             System.out.println(h);

             //获取类HeroPlus的名字叫做name的字段
             //Field f1= h.getClass().getDeclaredField("name");
             Field f1= clazz.getDeclaredField("name");
             //修改h对象的name字段
             f1.set(h, "teemo");
             //打印被修改后的值
             System.out.println(h);

         } catch (Exception e) {
             // TODO Auto-generated catch block
             e.printStackTrace();
         }
 }
}
```

::: info 补充

**getField和getDeclaredField的区别**

  getField 只能获取public的，包括从父类继承来的字段。

 getDeclaredField 可以获取本类所有的字段，包括private的，但是 不能获取继承来的字段。 (注： 这里只能获取到private的字段，但

并不能访问该private字段的值,除非加上setAccessible(true))

:::

------

### （四）获取成员方法并使用

**基本步骤**

1. 创建HeroPlus的对象 `h`

2. 获取成员方法

   public Method getMethod(String name ，Class<?>… parameterTypes):获取"公有方法"；（包含了父类的方法也包含Object类）

   public Method getDeclaredMethods(String name ，Class<?>… parameterTypes) :获取成员方法，包括私有的(不包括继承的)

   **参数解释**：name : 方法名； Class … : 形参的Class类型对象

3. 调用方法

   Method --> public Object invoke(Object obj,Object… args):

   **参数说明**： obj : 要调用方法的对象；args:调用方式时所传递的实参；



```java
package reflect;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class MethodTest {
	public static void main(String[] args) {

	 HeroPlus h = new HeroPlus();

     try {
         // 获取这个名字叫做setName，参数类型是String的方法
         Method m = h.getClass().getMethod("setName", String.class);
         // 对h对象，调用这个方法
         m.invoke(h, "盖伦");
         // 使用传统的方式，调用getName方法
         System.out.println(h.getName());
         // 使用反射读取
         Field f = h.getClass().getDeclaredField("name");
         System.out.println(f.get(h));

     } catch (Exception e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
     }

 }
}
```

------

### （五）获取main方法并使用



1、HeroPlus 新增main方法

```java
public static void main(String[] args) {
		System.out.println("执行main方法");
}
```

2、通过下面步骤获取main方法[1](https://blog.csdn.net/lililuni/article/details/83449088?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161284956016780274151023%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=161284956016780274151023&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-7-83449088.pc_search_result_no_baidu_js&utm_term=java%E5%8F%8D%E5%B0%84#fn1)

```java
package reflect;

import java.lang.reflect.Method;

public class MainTest {
	public static void main(String[] args) {
		try {
			//1、获取HeroPlus对象的Class实例
			Class clazz = Class.forName("reflect.HeroPlus");

			//2、获取main方法,第一个参数：方法名称，第二个参数：方法形参的类型，
			 Method methodMain = clazz.getMethod("main", String[].class);
			//3、调用main方法
			// methodMain.invoke(null, new String[]{"a","b","c"});
			//第一个参数，对象类型，因为方法是static静态的，所以为null可以，第二个参数是String数组，这里要注意在jdk1.4时是数组，jdk1.5之后是可变参数
			//这里拆的时候将  new String[]{"a","b","c"} 拆成3个对象。所以需要将它强转。
			 methodMain.invoke(null, (Object)new String[]{"a","b","c"});//方式一
			// methodMain.invoke(null, new Object[]{new String[]{"a","b","c"}});//方式二

		} catch (Exception e) {
			e.printStackTrace();
		}


	}
}

```

## 七、关于反射的用法举例

 反射非常强大，但是从上面的记录来看，反而觉得还不如直接调用方法来的直接和方便。

 通常来说，需要在学习了Spring 的依赖注入，反转控制之后，才会对反射有更好的理解，所以先这里举两个例子，来演示一下反射的一种实际运用。

### （一）通过反射读取配置文件内容

1、首先准备两个业务类

```java
package service;
public class Service1 {
    public void doService1(){
        System.out.println("业务方法1");
    }
}

package service;
public class Service2 {
	public void doService2(){
        System.out.println("业务方法2");
    }
}

```

2、当需要从第一个业务方法切换到第二个业务方法的时候，使用非反射方式，必须修改代码，并且重新编译运行，才可以达到效果

```java
package service;
public class CommonTest {
	  public static void main(String[] args) {
		  //new Service1().doService1();
		  //必须重新修改代码
	        new Service2().doService2();
	    }
}
```

3、使用反射方式则方便很多

1. 首先准备一个配置文件，叫做config.properties, 放在resource目录下，里面存放的是类的名称和要调用的方法名。
2. 在测试类Test中，首先取出类名称和方法名，然后通过反射去调用这个方法。
3. 当需要从调用第一个业务方法，切换到调用第二个业务方法的时候，不需要修改一行代码，也不需要重新编译，只需要修改配置文件spring.txt，再运行即可。


config.properties内容

```java
class=service.Service1
method=doService1
```

测试类

```java
package service;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Properties;

public class ReflectTest {
	@SuppressWarnings({ "rawtypes", "unchecked" })
    public static void main(String[] args) throws Exception {

        //从spring.txt中获取类名称和方法名称
        InputStream in = ReflectTest.class.getResourceAsStream("/config.properties");
        Properties properties = new Properties();
        try {
            properties.load(in);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String className = (String) properties.get("class");
        String methodName = (String) properties.get("method");

        //根据类名称获取类对象
        Class clazz = Class.forName(className);
        //根据方法名称，获取方法对象
        Method m = clazz.getMethod(methodName);
        //获取构造器
        Constructor c = clazz.getConstructor();
        //根据构造器，实例化出对象
        Object service = c.newInstance();
        //调用对象的指定方法
        m.invoke(service);

    }
}

```



### （二）通过反射越过泛型检查

 泛型是在编译期间起作用的。在编译后的.class文件中是没有泛型的。所有比如T或者E类型啊，本质都是通过Object处理的。所以可以通过使用反射来越过泛型。

```java
package reflect;

import java.lang.reflect.Method;
import java.util.ArrayList;

public class GenericityTest {
	public static void main(String[] args) throws Exception{

	ArrayList<String> list = new ArrayList<>();
	list.add("this");
	list.add("is");

   //list.add(5); //报错

	/********** 越过泛型检查    **************/

	//获取ArrayList的Class对象，反向的调用add()方法，添加数据
	Class listClass = list.getClass();
	//获取add()方法
	Method m = listClass.getMethod("add", Object.class);
	//调用add()方法
	m.invoke(list, 5);

	//遍历集合
	for(Object obj : list){
		System.out.println(obj);
		}
	}

}

```

::: right 参考

[廖雪峰Java教程 - 反射](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945389098144)

[皮卡卡西- Java 反射](https://blog.csdn.net/lililuni/article/details/83449088?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522161284956016780274151023%252522%25252C%252522scm%252522%25253A%25252220140713.130102334..%252522%25257D&request_id=161284956016780274151023&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-7-83449088.pc_search_result_no_baidu_js&utm_term=java%25E5%258F%258D%25E5%25B0%2584) 