---
title: JavaSE-注解
---

<!-- more -->

## 一、理解注解

### （一）为什么要引入注解

使用注解之前(甚至在使用之后)，XML被广泛的应用于描述元数据，得到各大框架的青睐，它以松耦合的方式完成了框架中几乎所有的配置，但是随着项目越来越庞大，XML的内容也越来越复杂，一些应用开发人员和架构师发现维护成本变高。他们希望使用一些和代码紧耦合的东西，于是就有人提出来一种标记式高耦合的配置方式注解。方法上可以进行注解，类上也可以注解，字段属性上也可以注解，反正几乎需要配置的地方都可以进行注解。

【注解】 VS 【XML】:

- 注解可以提供更大的便捷性，易于维护修改，但耦合度高
- XML相对于注解则是相反的。追求低耦合就要抛弃高效率，追求效率必然会遇到耦合。

::: info 如何选择

假如你想为应用设置很多的常量或参数，这种情况下，【XML】是一个很好的选择，因为它不会同特定的代码耦合。

如果你想把某个方法声明为服务，那么使用【注解】会更好一些，因为这种情况下需要注解和方法紧密耦合起来，开发人员也必须认识到这点。

目前，许多框架将【XML】和【注解】两种方式结合使用，平衡两者之间的利弊。

:::



### （二）什么是注解

注解也叫**元数据**，即一种描述数据的数据。例如我们常见的@Override和@Deprecated，注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解

实际上Java注解与普通修饰符(public、static、void等)的使用方式并没有多大区别，**一个注解准确意义上来说，只不过是一种特殊的注释而已**， ==如果没有解析它的代码，它可能连注释都不如==   。下面的例子是常见的注解：

```java
public class MyAnnotation {
    //@Test注解修饰方法A
    @Test
    public static void A(){
        System.out.println("Test.....");
    }

    //一个方法上可以拥有多个不同的注解
    @Deprecated
    @SuppressWarnings("uncheck")
    public static void B(){

    }
}
```

通过在方法上使用@Test注解后，在运行该方法时，测试框架会自动识别该方法并单独调用，@Test实际上是一种标记注解，起标记作用，运行时告诉测试框架该方法为测试方法。而对于`@Deprecated`和`@SuppressWarnings(“uncheck”)`，则是Java本身内置的注解，在代码中，可以经常看见它们，但这并不是一件好事，毕竟当方法或是类上面有`@Deprecated`注解时，说明该方法或是类都已经过期不建议再用，`@SuppressWarnings` 则表示忽略指定警告，比如`@SuppressWarnings(“uncheck”)`，这就是注解的最简单的使用方式。

::: tip 

解析一个类或者方法的注解往往有两种形式：

- 一种是编译期直接的扫描
- 一种是运行期反射

:::

反射的事情先不讨论，而编译器的扫描指的是编译器在对 Java 代码编译成字节码的过程中会检测到某个类或者方法被一些注解修饰，这时它就会对于这些注解进行某些处理。

再来看一个例子:

```java
@Override
public String toString() {
    return "Hello Annotation";
}
```

上面的代码中重写了`toString()`方法并使用了`@Override`注解。但是，即使不使用`@Override`注解标记代码，程序也能够正常执行。

那么，该注解表示什么？这么写有什么好处吗？

事实上，`@Override`告诉编译器这个方法是一个重写方法(描述方法的元数据)，如果父类中不存在该方法，编译器便会报错，提示该方法没有重写父类中的方法。如果不小心拼写错误，例如将`toString()`写成了`toStrring()`，而且也没有使用`@Override`注解，那程序依然能编译运行。但运行结果会和期望的大不相同。现在我们了解了什么是注解，并且使用注解有助于提高代码的可读性。



## 二、注解的用途

1. 生成文档，通过代码里标识的元数据生成javadoc文档。
2. 编译检查，通过代码里标识的元数据让编译器在编译期间进行检查验证。
3. 编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。
4. 运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例



## 三、注解的分类

Java 定义了一套注解，共有 7 个，3 个在 java.lang 中，剩下 4 个在 java.lang.annotation 中。

**作用在代码的注解** ( ==使用这些注解后编译器就会进行检查== )

1. @Override ：检查该方法是否是重写方法。如果发现其父类，或者是引用的接口中并没有该方法时，会报编译错误。

2. @Deprecated ：标记过时方法。如果使用该方法，会报编译警告。

3. @SuppressWarnings ：指示编译器去忽略注解中声明的警告。

   

**元注解**（ ==用于定义注解的注解== ）

1. @Retention ：标识这个注解怎么保存，是只在代码中，还是编入class文件中，或者是在运行时可以通过反射访问。
2. @Documented ： 标记这些注解是否包含在用户文档中。
3. @Target ：标记这个注解应该是哪种 Java 成员。
4. @Inherited ： 标记这个注解是继承于哪个注解类(默认 注解并没有继承于任何子类)

**Java7之后额外添加了 3 个注解**

- @SafeVarargs ： Java 7 开始支持，忽略任何使用参数为泛型变量的方法或构造函数调用产生的警告。
- @FunctionalInterface ： Java 8 开始支持，标识一个匿名函数或函数式接口。
- @Repeatable： Java 8 开始支持，标识某注解可以在同一个声明上使用多次，属于元注解，使用较少。

**自定义注解**

​         可以根据自己的需求定义注解



## 四、声明注解与元注解

要想真正掌握怎么使用注解，还需要先学习一下元注解。元注解(meta annotation)是用于标注其他注解的注解，学习元注解之后我们就可以利用元注解来自定义注解。

元注解有 @Retention、@Target、@Inherited、@Repeatable、@Documented 5 种。

我们先来看看前面的Test注解是如何声明的：

```java
//声明Test注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Test {

} 
```

我们使用了`@interface`声明了Test注解，并使用`@Target`注解传入`ElementType.METHOD`参数来标明@Test只能用于方法上，`@Retention(RetentionPolicy.RUNTIME)`则用来表示该注解生存期是运行时，从代码上看注解的定义很像接口的定义，确实如此，毕竟在编译后也会生成Test.class文件。对于`@Target`和`@Retention`是由Java提供的元注解，所谓元注解就是标记其他注解的注解，下面分别介绍

### @Target

Target 是目标的意思，@Target 用来约束注解可以应用于源码的哪些位置（如方法、类或字段）

可以这样理解，当一个注解被 @Target 注解时，这个注解就被限定了 ==运用场景==。

@Target 参数是ElementType是枚举类型，其定义如下，也代表可能的取值范围

```java
public enum ElementType {
    /**标明该注解可以用于类、接口（包括注解类型）或enum声明*/
    TYPE,

    /** 标明该注解可以用于字段(域)声明，包括enum实例 */
    FIELD,

    /** 标明该注解可以用于方法声明 */
    METHOD,

    /** 标明该注解可以用于参数声明 */
    PARAMETER,

    /** 标明注解可以用于构造函数声明 */
    CONSTRUCTOR,

    /** 标明注解可以用于局部变量声明 */
    LOCAL_VARIABLE,

    /** 标明注解可以用于注解声明(应用于另一个注解上)*/
    ANNOTATION_TYPE,

    /** 标明注解可以用于包声明 */
    PACKAGE,

    /**
     * 标明注解可以用于类型参数声明（1.8新加入）
     * @since 1.8
     */
    TYPE_PARAMETER,

    /**
     * 类型使用声明（1.8新加入)
     * @since 1.8
     */
    TYPE_USE
}
```

`@Target`注解参数可以是数组，当注解未指定Target值时，则此注解可以用于任何元素之上，多个值使用{}包含并用逗号隔开，如：`{ ElementType.METHOD, ElementType.FIELD }`

```java
// Java语言使用@interface语法来定义注解（Annotation）
// 参数表明此注解可以用在方法或字段上
@Target({ElementType.METHOD,ElementType.FIELD})
public @interface MyAnnotation {
    ...
}
```



### @Retention

Retention 的英文意为保留期的意思。当 @Retention 应用到一个注解上的时候，它解释说明了这个注解的的 ==生命周期==。

它的取值如下：

- `SOURCE`：注解将被编译器丢弃（该类型的注解信息只会保留在源码里，源码经过编译后，注解信息会被丢弃，不会保留在编译好的class文件里）
- `CLASS`：注解在class文件中可用，但会被VM丢弃（该类型的注解信息会保留在源码里和class文件里，在执行的时候，不会加载到虚拟机中），请注意，当注解未定义Retention值时，默认值是CLASS，如Java内置注解，@Override、@Deprecated、@SuppressWarnning等
- `RUNTIME`：注解信息将在运行期(JVM)也保留，因此可以通过反射机制读取注解的信息（源码、class文件和执行的时候都有注解的信息），如SpringMVC中的@Controller、@Autowired、@RequestMapping等。

::: tip 

如果`@Retention`不存在，则该`Annotation`默认为`CLASS`。

因为通常我们自定义的`Annotation`都是`RUNTIME`，所以，务必要加上`@Retention(RetentionPolicy.RUNTIME)`这个元注解

:::



### @Repeatable

Repeatable 自然是可重复的意思。@Repeatable 是 Java 1.8 才加进来的，所以算是一个新的特性。这个注解应用不是特别广泛。

Repeatable使用场景：在需要对同一种注解多次使用时，往往需要借助@Repeatable。

下面举例说明一下，在生活中一个人往往是具有多种身份，如果我把每种身份当成一种注解该如何使用

先声明一个Persons类用来包含所有的身份

```java
@Target(ElementType.TYPE) 
@Retention(RetentionPolicy.RUNTIME)
public @interface Persons {
	Person[] value();
}
```

这里@Target是声明Persons注解的作用范围，参数ElementType.Type代表可以给一个类进行注解

@Retention是注解的有效时间，RetentionPolicy.RUNTIME是指程序运行的时候。

Person注解

```java
@Repeatable(Persons.class)
public @interface Person{
	String role() default "";
}
```

@Repeatable括号内的就相当于用来保存该注解内容的容器。

声明一个Man类，给该类加上一些身份。

```java
@Person(role="CEO")
@Person(role="husband")
@Person(role="father")
public   class Man {
	String name="";
}
```

在主方法中访问该注解。

```java
public static void main(String[] args) {
    Annotation[] annotations = Man.class.getAnnotations();  
    System.out.println(annotations.length);
    Persons p=(Persons) annotations[0];
    for(Person t:p.value()){
    	System.out.println(t.role());
    }
}
```

运行结果

```java
1
CEO
husband
father
```



### @Inherited

@Inherited 可以让注解被继承，但这并不是真的继承，只是通过使用@Inherited，可以让子类Class对象使用getAnnotations()获取父类被@Inherited修饰的注解。`@Inherited`仅针对`@Target(ElementType.TYPE)`类型的`annotation`有效，并且仅针对`class`的继承，对`interface`的继承无效：

```java
package test;

import java.lang.annotation.*;
import java.util.Arrays;

@Inherited
@Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface DocumentA {
}

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface DocumentB {
}

@DocumentA
class A{ }

class B extends A{ }

@DocumentB
class C{ }

class D extends C{ }

/**
 * 测试
 */
public class DocumentedTest {

    public static void main(String... args){
        B b = new B();
        System.out.println("使用了@Inherited注解:"+ Arrays.toString(b.getClass().getAnnotations()));

        D d = new D();
        System.out.println("没有使用@Inherited注解:"+Arrays.toString(d.getClass().getAnnotations()));
    }

    /**
     运行结果:
     使用了@Inherited注解:[@test.DocumentA()]
     没有使用@Inherited注解:[]
     */
}

```



### @Documented

顾名思义，这个元注解肯定是和文档有关。它的作用是能够将注解中的元素包含到 Javadoc 中去。

如果使用@Documented标注了，在生成javadoc的时候就会把@Documented注解给显示出来。

@Documented注解只是用来做标识，没什么实际作用，了解就好。

（一）类上添加注解@DocumentA、@DocumentB

```java
/**
 * 测试
 */
@DocumentA
@DocumentB
public class DocumentedTest {

    public static void main(String... args){
        B b = new B();
        System.out.println("使用了@Inherited注解:"+ Arrays.toString(b.getClass().getAnnotations()));

        D d = new D();
        System.out.println("没有使用@Inherited注解:"+Arrays.toString(d.getClass().getAnnotations()));
    }

    /**
     运行结果:
     使用了@Inherited注解:[@test.DocumentA()]
     没有使用@Inherited注解:[]
     */
}
```

（二）执行命令 javadoc  DocumentedTest.java

生成的文档：

![](./assets/java-01.png)



## 五、注解属性及其数据类型

### （一）注解的属性

注解的属性也叫做成员变量。注解只有成员变量，没有方法。注解的成员变量在注解的定义中以“无形参的方法”形式来声明，其方法名定义了该成员变量的名字，其返回值定义了该成员变量的类型。

@Test内部没有定义其他元素，所以@Test也称为标记注解（marker annotation），但在自定义注解中，一般都会包含一些元素以表示某些值，方便处理器使用。

```java
@Target(ElementType.TYPE)//只能应用于类上
@Retention(RetentionPolicy.RUNTIME)//保存到运行时
public @interface MyAnnotation {
    int id() default 0;
    String name() default ""; //注解元素 String类型
}
```



上面代码定义了 @TestAnnotation 这个注解中拥有 id 和 msg 两个属性。在使用的时候，我们应该给它们进行赋值。

```java
@MyAnnotation(id=3, name="hello annotation")
public class Test {

}
```



### （二）注解的数据类型

**注解支持的元素数据类型**：

- 所有基本类型（int,float,boolean,byte,double,char,long,short）
- String
- Class
- enum
- Annotation
- 上述类型的数组

倘若使用了其他数据类型，编译器将会丢出一个编译错误，注意，声明注解元素时可以使用基本类型但不允许使用任何包装类型，同时还应该注意到注解也可以作为元素的类型，也就是嵌套注解，下面的代码演示了上述类型的使用过程：

```java
package com.zejian.annotationdemo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 数据类型使用Demo
 */

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface Reference{
    boolean next() default false;
}

public @interface AnnotationElementDemo {
    //枚举类型
    enum Status {FIXED,NORMAL};

    //声明枚举
    Status status() default Status.FIXED;

    //布尔类型
    boolean showSupport() default false;

    //String类型
    String name()default "";

    //class类型
    Class<?> testCase() default Void.class;

    //注解嵌套
    Reference reference() default @Reference(next=true);

    //数组类型
    long[] value();
}
```



## 六、编译器对默认值的限制

编译器对元素的默认值有些过分挑剔。首先，元素不能有不确定的值。也就是说，元素必须要么具有默认值，要么在使用注解时提供元素的值。其次，对于非基本类型的元素，无论是在源代码中声明，还是在注解接口中定义默认值，都不能以null作为值，这就是限制，没有什么利用可言，但造成一个元素的存在或缺失状态，因为每个注解的声明中，所有的元素都存在，并且都具有相应的值，为了绕开这个限制，只能定义一些特殊的值，例如空字符串或负数，表示某个元素不存在。



## 七、注解不支持继承

注解是不支持继承的，因此不能使用关键字extends来继承某个@interface，但注解在编译后，编译器会自动继承java.lang.annotation.Annotation接口，这里我们反编译前面定义的MyAnnotation注解

```java
package com.zejian.annotationdemo;

import java.lang.annotation.Annotation;
//反编译后的代码
public interface MyAnnotation extends Annotation
{
    public abstract String name();
}
```

虽然反编译后发现MyAnnotation注解继承了Annotation接口，请记住，即使Java的接口可以实现多继承，但定义注解时依然无法使用extends关键字继承@interface。



## 八、自定义注解

由于@Test内部没有定义其他元素，所以@Test也称为标记注解（marker annotation），但在自定义注解中，一般都会包含一些元素以表示某些值，方便处理器使用，

### 第一步，用`@interface`定义注解：

```java
public @interface MyAnnotation {
}
```

### 第二步，添加参数、默认值：

```java
public @interface MyAnnotation {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```

注解的参数类似无参数方法，可以用`default`设定一个默认值（强烈推荐）。把最常用的参数定义为`value()`，推荐所有参数都尽量设置默认值。

### 第三步，用元注解配置注解：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```

其中，必须设置`@Target`和`@Retention`，`@Retention`一般设置为`RUNTIME`，因为我们自定义的注解通常要求在运行期读取。一般情况下，不必写`@Inherited`和`@Repeatable`。

::: info 小结

- Java使用`@interface`定义注解;
- 可定义多个参数和默认值，核心参数使用`value`名称；
- 必须设置`@Target`来指定`Annotation`可以应用的范围；
- 应当设置`@Retention(RetentionPolicy.RUNTIME)`便于运行期读取该`Annotation`。

:::



## 九、快捷方式

所谓的快捷方式就是注解中定义了名为value的元素，并且在使用该注解时，如果该元素是唯一需要赋值的一个元素，那么此时无需使用key=value的语法，而只需在括号内给出value元素所需的值即可。这可以应用于任何合法类型的元素，记住，这限制了 ==元素名必须为value==，**推荐设置默认值**，简单案例如下

```java
package com.zejian.annotationdemo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//定义注解
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@interface IntegerVaule{
    int value() default 0;
    String name() default "";
}

//使用注解
public class QuicklyWay {

    //当只想给value赋值时,可以使用以下快捷方式
    @IntegerVaule(20)
    public int age;

    //当name也需要赋值时必须采用key=value的方式赋值
    @IntegerVaule(value = 10000,name = "MONEY")
    public int money;

}
```



## 十、使用注解

### （一）注解的声明

1. 定义一个可以注解在Class，interface，enum上的注解
2. 定义一个可以注解在METHOD上的注解
3. 定义一个可以注解在FIELD上的注解
4. 定义一个可以注解在PARAMETER上的注解

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnTargetType {

    /**
     * 定义注解的一个元素 并给定默认值
     * @return
     */
    String value() default "定义在类、接口、枚举类上的注解元素value的默认值";

}
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnTargetMethod {

    /**
     * 定义注解的一个元素 并给定默认值
     * @return
     */
    String value() default "定义在方法上的注解元素value的默认值";

}
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnTargetField {

    /**
     * 定义注解的一个元素 并给定默认值
     * @return
     */
    String value() default "定义在字段上的注解元素value的默认值";

}
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnTargetParameter {

    /**
     * 定义注解的一个元素 并给定默认值
     * @return
     */
    String value() default "定义在参数上的注解元素value的默认值";

}
```

### （二）注解的读取

因为注解定义后也是一种`class`，所有的注解都继承自`java.lang.annotation.Annotation`，因此，读取注解，需要使用反射API。

**Java提供的使用反射API读取`Annotation`的方法包括**：

（1）判断某个注解是否存在于`Class`、`Field`、`Method`或`Constructor`：

- `Class.isAnnotationPresent(Class)`
- `Field.isAnnotationPresent(Class)`
- `Method.isAnnotationPresent(Class)`
- `Constructor.isAnnotationPresent(Class)`

（2）使用反射API读取Annotation：

- `Class.getAnnotation(Class)`
- `Field.getAnnotation(Class)`
- `Method.getAnnotation(Class)`
- `Constructor.getAnnotation(Class)`



**使用反射API读取`Annotation`有两种方法**：

方法一：先判断`Annotation`是否存在，如果存在，就直接读取：

```java
Class test = Test.class;
if (cls.isAnnotationPresent(MyAnnotation.class)) {
    MyAnnotation MyAnnotation = test.getAnnotation(MyAnnotation.class);
    ...
}
```

方法二：直接读取`Annotation`，如果`Annotation`不存在，将返回`null`：

```java
Class test = Test.class;
MyAnnotation MyAnnotation = test.getAnnotation(MyAnnotation.class);
if (MyAnnotation != null) {
   ...
}
```



知道如何获取注解后可以接下来的测试了

```java
package test;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

@MyAnTargetType
public class AnnotationTest {

    @MyAnTargetField
    private String field = "我是字段";

    @MyAnTargetMethod("测试方法")
    public void test(@MyAnTargetParameter String args) {
        System.out.println("参数值 === " + args);
    }

    public static void main(String[] args) {
        // 1、先获取Class实例
        Class<AnnotationTest> testClass = AnnotationTest.class;

        // 2、反射获取类上的注解MyAnTargetType
        MyAnTargetType t = testClass.getAnnotation(MyAnTargetType.class);
        if (t != null){
            System.out.println("类上的注解值 === " + t.value());
        }

        MyAnTargetMethod tm = null;
        try {
            // 3、反射获取AnnotationTest类上的test方法
            Method method = testClass.getDeclaredMethod("test", String.class);
            // 获取方法上的注解MyAnTargetMethod
            tm = method.getAnnotation(MyAnTargetMethod.class);
            if (tm != null){
                System.out.println("方法上的注解值 === " + tm.value());
            }

            // 4、获取方法上的所有参数注解  循环所有注解找到MyAnTargetParameter注解
            // 要读取方法参数的Annotation就比较麻烦一点，因为方法参数本身可以看成一个数组，
            // 而每个参数又可以定义多个注解，所以，一次获取方法参数的所有注解就必须用一个二维数组来表示。
            // 获取所有参数的Annotation:
            Annotation[][] annotations = method.getParameterAnnotations();
            for (Annotation[] tt : annotations) {
                for (Annotation t1 : tt) {
                    if (t1 instanceof MyAnTargetParameter) {
                        System.out.println("参数上的注解值 === " + ((MyAnTargetParameter) t1).value());
                    }
                }
            }
            method.invoke(new AnnotationTest(), "改变默认参数");
            // 获取AnnotationTest类上字段field的注解MyAnTargetField
            MyAnTargetField fieldAn = testClass.getDeclaredField("field").getAnnotation(MyAnTargetField.class);
            if (fieldAn != null){
                System.out.println("字段上的注解值 === " + fieldAn.value());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

```

输出结果

```markdown
类上的注解值 === 定义在类接口枚举类上的注解元素value的默认值
方法上的注解值 === 测试方法
参数上的注解值 === 定义在参数上的注解元素value的默认值
参数值 === 改变默认参数
字段上的注解值 === 定义在字段上的注解元素value的默认值
```



### （四）注解的使用

注解如何使用，完全由程序自己决定。例如，JUnit是一个测试框架，它会自动运行所有标记为`@Test`的方法。

我们来看一个`@Range`注解，我们希望用它来定义一个`String`字段的规则：字段长度满足`@Range`的参数定义：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Range {
    int min() default 0;
    int max() default 255;
}
```

在某个JavaBean中，我们可以使用该注解：

```java
public class Person {
    @Range(min=1, max=20)
    public String name;

    @Range(max=10)
    public String city;
}
```

但是，定义了注解，本身对程序逻辑没有任何影响。我们必须自己编写代码来使用注解。这里，我们编写一个`Person`实例的检查方法，它可以检查`Person`实例的`String`字段长度是否满足`@Range`的定义：

```java
void check(Person person) throws IllegalArgumentException, ReflectiveOperationException {
    // 遍历所有Field:
    for (Field field : person.getClass().getFields()) {
        // 获取Field定义的@Range:
        Range range = field.getAnnotation(Range.class);
        // 如果@Range存在:
        if (range != null) {
            // 获取Field的值:
            Object value = field.get(person);
            // 如果值是String:
            if (value instanceof String) {
                String s = (String) value;
                // 判断值是否满足@Range的min/max:
                if (s.length() < range.min() || s.length() > range.max()) {
                    throw new IllegalArgumentException("Invalid field: " + field.getName());
                }
            }
        }
    }
}
```

这样一来，我们通过`@Range`注解，配合`check()`方法，就可以完成`Person`实例的检查。注意检查逻辑完全是我们自己编写的，JVM不会自动给注解添加任何额外的逻辑。



## 十一、Annotation

如果一来就看Annotation 架构可能就很懵逼了，但是学习了上面的相关知识再来看就很清晰了

Annotation接口中有下面这句话来描述注解：Annotation 是所有注解继承的公共接口

```java
The common interface extended by all annotation types.
```

注解本质是一个继承了Annotation的特殊接口，其具体实现类是Java运行时生成的动态代理类。而我们通过反射获取注解时，返回的是Java运行时生成的动态代理对象$Proxy1。通过代理对象调用自定义注解（接口）的方法，会最终调用AnnotationInvocationHandler的invoke方法。该方法会从memberValues这个Map中索引出对应的值。而memberValues的来源是Java常量池。

### （一）Annotation 架构图

<img src="./assets/java-03.png" style="zoom:80%;" />

从图看出：

1、 ==所有注解本质上都继承自Annotation==

2、1 个 Annotation 和 1 个 RetentionPolicy 关联

- RetentionPolicy 是 Enum 枚举类型，它用来指定 Annotation 的策略。通俗点说，就是不同 RetentionPolicy 类型的 Annotation 的作用域不同
- 可以理解为：每1个Annotation对象，都会有唯一的RetentionPolicy属性

3、 1 个 Annotation 和 1~n 个 ElementType 关联

- ElementType 是 Enum 枚举类型，它用来指定 Annotation 的类型
- 可以理解为：对于每 1 个 Annotation 对象，可以有若干个 ElementType 属性。

### （二）Annotation 组成部分

```java
//Annotation.java

package java.lang.annotation;
public interface Annotation {

    boolean equals(Object obj);

    int hashCode();

    String toString();

    Class<? extends Annotation> annotationType();
}
```



```java
//ElementType.java

package java.lang.annotation;
public enum ElementType {
   /**标明该注解可以用于类、接口（包括注解类型）或enum声明*/
   TYPE,
 
   /** 标明该注解可以用于字段(域)声明，包括enum实例 */
   FIELD,
 
   /** 标明该注解可以用于方法声明 */
   METHOD,
 
   /** 标明该注解可以用于参数声明 */
   PARAMETER,
 
   /** 标明注解可以用于构造函数声明 */
   CONSTRUCTOR,
 
   /** 标明注解可以用于局部变量声明 */
   LOCAL_VARIABLE,
 
   /** 标明注解可以用于注解声明(应用于另一个注解上)*/
   ANNOTATION_TYPE,
 
   /** 标明注解可以用于包声明 */
   PACKAGE,
 
   /**
    * 标明注解可以用于类型参数声明（1.8新加入）
    * @since 1.8
    */
   TYPE_PARAMETER,
 
   /**
    * 类型使用声明（1.8新加入)
    * @since 1.8
    */
   TYPE_USE
}
```



```java
//RetentionPolicy.java

package java.lang.annotation;
public enum RetentionPolicy {
   /** Annotation信息仅存在于编译器处理期间，编译器处理完之后就没有该Annotation信息了 */
    SOURCE,            

    /** 编译器将Annotation存储于类对应的.class文件中。默认行为 */
    CLASS,             

    /** 编译器将Annotation存储于class文件中，并且可由JVM读入 */
    RUNTIME           
}
```



## 十二、注解与反射机制

前面经过反编译后，我们知道Java所有注解都继承了Annotation接口，也就是说　Java使用Annotation接口代表注解元素，该接口是所有Annotation类型的父接口。同时为了运行时能准确获取到注解的相关信息，Java在java.lang.reflect 反射包下新增了AnnotatedElement接口，它主要用于表示目前正在 VM 中运行的程序中已使用注解的元素，通过该接口提供的方法可以利用反射技术地读取注解的信息，如反射包的Constructor类、Field类、Method类、Package类和Class类都实现了AnnotatedElement接口，它简要含义如下：

Class：类的Class对象定义 　

Constructor：代表类的构造器定义 　

Field：代表类的成员变量定义

Method：代表类的方法定义 　

Package：代表类的包定义



下面是AnnotatedElement中相关的API方法，以上5个类都实现以下的方法

| 返回值                   | 方法名称                                                     | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `<A extends Annotation>` | `getAnnotation(Class<A> annotationClass)`                    | 该元素如果存在指定类型的注解，则返回这些注解，否则返回 null。 |
| `Annotation[]`           | `getAnnotations()`                                           | 返回此元素上存在的所有注解，包括从父类继承的                 |
| `boolean`                | `isAnnotationPresent(Class<? extends Annotation> annotationClass)` | 如果指定类型的注解存在于此元素上，则返回 true，否则返回 false。 |
| `Annotation[]`           | `getDeclaredAnnotations()`                                   | 返回直接存在于此元素上的所有注解，注意，不包括父类的注解，调用者可以随意修改返回的数组；这不会对其他调用者返回的数组产生任何影响，没有则返回长度为0的数组 |

简单案例演示如下：

```java

//继承了A类
@DocumentB
public class DocumentDemo extends A{

    public static void main(String... args){

        Class<?> clazz = DocumentDemo.class;
        //根据指定注解类型获取该注解
        DocumentA documentA=clazz.getAnnotation(DocumentA.class);
        System.out.println("A:"+documentA);

        //获取该元素上的所有注解，包含从父类继承
        Annotation[] an= clazz.getAnnotations();
        System.out.println("an:"+ Arrays.toString(an));
        //获取该元素上的所有注解，但不包含继承！
        Annotation[] an2=clazz.getDeclaredAnnotations();
        System.out.println("an2:"+ Arrays.toString(an2));

        //判断注解DocumentA是否在该元素上
        boolean b=clazz.isAnnotationPresent(DocumentA.class);
        System.out.println("b:"+b);

        /**
         执行结果:
         A:@test.DocumentA()
         an:[@test.DocumentA(), @test.DocumentB()]
         an2:[@test.DocumentB()]
         b:true
         */
    }
}
```



## 十三、运行时注解处理器

了解完注解与反射的相关API后，现在通过一个实例来演示利用运行时注解来组装数据库SQL的构建语句的过程

```java
/**
 * 表注解
 */
@Target(ElementType.TYPE)//只能应用于类上
@Retention(RetentionPolicy.RUNTIME)//保存到运行时
public @interface DBTable {
    String name() default "";
}


/**
 * 注解Integer类型的字段
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface SQLInteger {
    //该字段对应数据库表列名
    String name() default "";
    //嵌套注解
    Constraints constraint() default @Constraints;
}


/**
 * 注解String类型的字段
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface SQLString {

    //对应数据库表的列名
    String name() default "";

    //列类型分配的长度，如varchar(30)的30
    int value() default 0;

    Constraints constraint() default @Constraints;
}


/**
 * 约束注解
 */

@Target(ElementType.FIELD)//只能应用在字段上
@Retention(RetentionPolicy.RUNTIME)
public @interface Constraints {
    //判断是否作为主键约束
    boolean primaryKey() default false;
    //判断是否允许为null
    boolean allowNull() default false;
    //判断是否唯一
    boolean unique() default false;
}

/**
 * 数据库表Member对应实例类bean
 */
@DBTable(name = "MEMBER")
public class Member {
    //主键ID
    @SQLString(name = "ID",value = 50, constraint = @Constraints(primaryKey = true))
    private String id;

    @SQLString(name = "NAME" , value = 30)
    private String name;

    @SQLInteger(name = "AGE")
    private int age;

    @SQLString(name = "DESCRIPTION" ,value = 150 , constraint = @Constraints(allowNull = true))
    private String description;//个人描述

   //省略set get.....
}
```

上述定义4个注解，分别是@DBTable(用于类上)、@Constraints(用于字段上)、 @SQLString(用于字段上)、@SQLString(用于字段上)并在Member类中使用这些注解，这些注解的作用的是用于帮助注解处理器生成创建数据库表MEMBER的构建语句，在这里有点需要注意的是，我们使用了嵌套注解@Constraints，该注解主要用于判断字段是否为null或者字段是否唯一。必须清楚认识到上述提供的注解生命周期必须为`@Retention(RetentionPolicy.RUNTIME)`，即运行时，这样才可以使用反射机制获取其信息。有了上述注解和使用，剩余的就是编写上述的注解处理器了，前面我们聊了很多注解，其处理器要么是Java自身已提供、要么是框架已提供的，我们自己都没有涉及到注解处理器的编写，但上述定义处理SQL的注解，其处理器必须由我们自己编写了，如下

```java
package test;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * 运行时注解处理器，构造表创建语句
 */
public class TableCreator {

  public static String createTableSql(String className) throws ClassNotFoundException {
    Class<?> cl = Class.forName(className);
    DBTable dbTable = cl.getAnnotation(DBTable.class);
    //如果没有表注解，直接返回
    if(dbTable == null) {
      System.out.println(
              "No DBTable annotations in class " + className);
      return null;
    }
    String tableName = dbTable.name();
    // If the name is empty, use the Class name:
    if(tableName.length() < 1)
      tableName = cl.getName().toUpperCase();
    List<String> columnDefs = new ArrayList<String>();
    //通过Class类API获取到所有成员字段
    for(Field field : cl.getDeclaredFields()) {
      String columnName = null;
      //获取字段上的注解
      Annotation[] anns = field.getDeclaredAnnotations();
      if(anns.length < 1)
        continue; // Not a db table column

      //判断注解类型
      if(anns[0] instanceof SQLInteger) {
        SQLInteger sInt = (SQLInteger) anns[0];
        //获取字段对应列名称，如果没有就是使用字段名称替代
        if(sInt.name().length() < 1)
          columnName = field.getName().toUpperCase();
        else
          columnName = sInt.name();
        //构建语句
        columnDefs.add(columnName + " INT" +
                getConstraints(sInt.constraint()));
      }
      //判断String类型
      if(anns[0] instanceof SQLString) {
        SQLString sString = (SQLString) anns[0];
        // Use field name if name not specified.
        if(sString.name().length() < 1)
          columnName = field.getName().toUpperCase();
        else
          columnName = sString.name();
        columnDefs.add(columnName + " VARCHAR(" +
                sString.value() + ")" +
                getConstraints(sString.constraint()));
      }


    }
    //数据库表构建语句
    StringBuilder createCommand = new StringBuilder(
            "CREATE TABLE " + tableName + "(");
    for(String columnDef : columnDefs)
      createCommand.append("\n    " + columnDef + ",");

    // Remove trailing comma
    String tableCreate = createCommand.substring(
            0, createCommand.length() - 1) + ");";
    return tableCreate;
  }


    /**
     * 判断该字段是否有其他约束
     * @param con
     * @return
     */
  private static String getConstraints(Constraints con) {
    String constraints = "";
    if(!con.allowNull())
      constraints += " NOT NULL";
    if(con.primaryKey())
      constraints += " PRIMARY KEY";
    if(con.unique())
      constraints += " UNIQUE";
    return constraints;
  }

  public static void main(String[] args) throws Exception {
    String[] arg={"test.Member"};
    for(String className : arg) {
      System.out.println("Table Creation SQL for " +
              className + " is :\n" + createTableSql(className));
    }

    /**
     * 输出结果：
     Table Creation SQL for test.Member is :
     CREATE TABLE MEMBER(
     ID VARCHAR(50) NOT NULL PRIMARY KEY,
     NAME VARCHAR(30) NOT NULL,
     AGE INT NOT NULL,
     DESCRIPTION VARCHAR(150)
     );
     */
  }
}
```

如果对反射比较熟悉的同学，上述代码就相对简单了，我们通过传递Member的全路径后通过Class.forName()方法获取到Member的class对象，然后利用Class对象中的方法获取所有成员字段Field，最后利用`field.getDeclaredAnnotations()`遍历每个Field上的注解再通过注解的类型判断来构建建表的SQL语句。这便是利用注解结合反射来构建SQL语句的简单的处理器模型，是否已回想起Hibernate？

## 十四、Java 8中注解增强

### （一）元注解@Repeatable

元注解@Repeatable是JDK1.8新加入的，它表示在同一个位置重复相同的注解。在没有该注解前，一般是无法在同一个类型上使用相同的注解的

```java
//Java8前无法这样使用
@FilterPath("/web/update")
@FilterPath("/web/add")
public class A {
    
}
```

Java8前如果是想实现类似的功能，我们需要在定义@FilterPath注解时定义一个数组元素接收多个值如下

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface FilterPath {
    String [] value();
}

//使用
@FilterPath({"/update","/add"})
public class A { 
}
```

但在Java8新增了@Repeatable注解后就可以采用如下的方式定义并使用了

```java
//使用Java8新增@Repeatable原注解
@Target({ElementType.TYPE,ElementType.FIELD,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(FilterPaths.class)//参数指明接收的注解class
public @interface FilterPath {
    String  value();
}

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface FilterPaths {
    FilterPath[] value();
}

//使用案例
@FilterPath("/web/update")
@FilterPath("/web/add")
@FilterPath("/web/delete")
class A{ 
}
```

我们可以简单理解为通过使用@Repeatable后，将使用@FilterPaths注解作为接收同一个类型上重复注解的容器，而每个@FilterPath则负责保存指定的路径串。

为了处理上述的新增注解，Java8还在`AnnotatedElement`接口新增了`getDeclaredAnnotationsByType() `和 `getAnnotationsByType()`两个方法并在接口给出了默认实现，在指定@Repeatable的注解时，可以通过这两个方法获取到注解相关信息。

但请注意:

- 旧版API中的getDeclaredAnnotation()和 getAnnotation()是不对@Repeatable注解的处理的(除非该注解没有在同一个声明上重复出现)。
- getDeclaredAnnotationsByType方法获取到的注解不包括父类，其实当 getAnnotationsByType()方法调用时，其内部先执行了getDeclaredAnnotationsByType方法，只有当前类不存在指定注解时，getAnnotationsByType()才会继续从其父类寻找，但请注意如果@FilterPath和@FilterPaths没有使用了@Inherited的话，仍然无法获取。下面通过代码来演示：

```java

//使用Java8新增@Repeatable原注解
@Target({ElementType.TYPE,ElementType.FIELD,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(FilterPaths.class)
public @interface FilterPath {
    String  value();
}


@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface FilterPaths {
    FilterPath[] value();
}

@FilterPath("/web/list")
class C { }

//使用案例
@FilterPath("/web/update")
@FilterPath("/web/add")
@FilterPath("/web/delete")
class A extends C{
    public static void main(String[] args) {

        Class<?> clazz = A.class;
        //通过getAnnotationsByType方法获取所有重复注解
        FilterPath[] annotationsByType = clazz.getAnnotationsByType(FilterPath.class);
        FilterPath[] annotationsByType2 = clazz.getDeclaredAnnotationsByType(FilterPath.class);
        if (annotationsByType != null) {
            for (FilterPath filter : annotationsByType) {
                System.out.println("1:"+filter.value());
            }
        }

        System.out.println("-----------------");

        if (annotationsByType2 != null) {
            for (FilterPath filter : annotationsByType2) {
                System.out.println("2:"+filter.value());
            }
        }


        System.out.println("使用getAnnotation的结果:"+clazz.getAnnotation(FilterPath.class));


        /**
         * 执行结果(当前类拥有该注解FilterPath,则不会从C父类寻找)
         1:/web/update
         1:/web/add
         1:/web/delete
         -----------------
         2:/web/update
         2:/web/add
         2:/web/delete
         使用getAnnotation的结果:null
         */
    }
}
```

从执行结果来看如果当前类拥有该注解@FilterPath,则getAnnotationsByType方法不会从C父类寻找，下面看看另外一种情况，即A类上没有@FilterPath注解

```java

//使用Java8新增@Repeatable原注解
@Target({ElementType.TYPE,ElementType.FIELD,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited //添加可继承元注解
@Repeatable(FilterPaths.class)
public @interface FilterPath {
    String  value();
}


@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Inherited //添加可继承元注解
@interface FilterPaths {
    FilterPath[] value();
}

@FilterPath("/web/list")
@FilterPath("/web/getList")
class C { }

//A上不使用@FilterPath注解,getAnnotationsByType将会从父类查询
class A extends C{
    public static void main(String[] args) {

        Class<?> clazz = A.class;
        //通过getAnnotationsByType方法获取所有重复注解
        FilterPath[] annotationsByType = clazz.getAnnotationsByType(FilterPath.class);
        FilterPath[] annotationsByType2 = clazz.getDeclaredAnnotationsByType(FilterPath.class);
        if (annotationsByType != null) {
            for (FilterPath filter : annotationsByType) {
                System.out.println("1:"+filter.value());
            }
        }

        System.out.println("-----------------");

        if (annotationsByType2 != null) {
            for (FilterPath filter : annotationsByType2) {
                System.out.println("2:"+filter.value());
            }
        }


        System.out.println("使用getAnnotation的结果:"+clazz.getAnnotation(FilterPath.class));


        /**
         * 执行结果(当前类没有@FilterPath,getAnnotationsByType方法从C父类寻找)
         1:/web/list
         1:/web/getList
         -----------------
         使用getAnnotation的结果:null
         */
    }
}
```

注意定义@FilterPath和@FilterPath时必须指明@Inherited，getAnnotationsByType方法否则依旧无法从父类获取@FilterPath注解，这是为什么呢，不妨看看getAnnotationsByType方法的实现源码：

```java
//接口默认实现方法
default <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass) {
//先调用getDeclaredAnnotationsByType方法
T[] result = getDeclaredAnnotationsByType(annotationClass);

//判断当前类获取到的注解数组是否为0
if (result.length == 0 && this instanceof Class && 
//判断定义注解上是否使用了@Inherited元注解 
 AnnotationType.getInstance(annotationClass).isInherited()) { // Inheritable
        //从父类获取
       Class<?> superClass = ((Class<?>) this).getSuperclass();
   if (superClass != null) {
      result = superClass.getAnnotationsByType(annotationClass);
       }
   }

   return result;
}
```

### （二）新增的两种ElementType

在Java8中 ElementType 新增两个枚举成员，TYPE_PARAMETER 和 TYPE_USE ，在Java8前注解只能标注在一个声明(如字段、类、方法)上，Java8后，新增的TYPE_PARAMETER可以用于标注类型参数，而TYPE_USE则可以用于标注任意类型(不包括class)。如下所示

```java
//TYPE_PARAMETER 标注在类型参数上
class D<@Parameter T> { }

//TYPE_USE则可以用于标注任意类型(不包括class)
//用于父类或者接口
class Image implements @Rectangular Shape { }

//用于构造函数
new @Path String("/usr/bin")

//用于强制转换和instanceof检查,注意这些注解中用于外部工具，它们不会对类型转换或者instanceof的检查行为带来任何影响。
String path=(@Path String)input;
if(input instanceof @Path String)

//用于指定异常
public Person read() throws @Localized IOException.

//用于通配符绑定
List<@ReadOnly ? extends Person>
List<? extends @ReadOnly Person>

@NotNull String.class //非法，不能标注class
import java.lang.@NotNull String //非法，不能标注
```

这里主要说明一下TYPE_USE，类型注解用来支持在Java的程序中做强类型检查，配合第三方插件工具（如Checker Framework），可以在编译期检测出runtime error（如UnsupportedOperationException、NullPointerException异常），避免异常延续到运行期才发现，从而提高代码质量，这就是类型注解的主要作用。

总之Java 8 新增加了两个注解的元素类型ElementType.TYPE_USE 和ElementType.TYPE_PARAMETER ，通过它们，我们可以把注解应用到各种新场合中。





::: right 参考

[廖雪峰Java教程 - 注解](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945389098144)

[菜鸟教程 - 注解](https://www.runoob.com/w3cnote/java-annotation.html)

[zejian的博客](https://blog.csdn.net/javazejian/article/details/71860633?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522161283974716780262542169%252522%25252C%252522scm%252522%25253A%25252220140713.130102334..%252522%25257D&request_id=161283974716780262542169&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-4-71860633.pc_search_result_no_baidu_js&utm_term=java%25E6%25B3%25A8%25E8%25A7%25A3)

:::