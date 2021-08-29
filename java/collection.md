---
title: JavaSE-集合
---

<!-- more -->

## 集合概要

Java的`java.util`包主要提供了以下三种类型的集合（也可以叫作容器，用来存储对象）

- `List`：一种有序列表的集合
- `Set`：一种保证没有重复元素的集合
- `Map`：一种通过键值（key-value）查找的映射表集合

Java集合的设计有几个特点：

1. 一是实现了接口和实现类相分离，例如，有序表的接口是`List`，具体的实现类有`ArrayList`，`LinkedList`等，

2. 二是支持泛型，我们可以限制在一个集合中只能放入同一种数据类型的元素，如：

   ```java
   List<String> list = new ArrayList<>(); // 只能放入String类型
   ```

3. 三是Java访问集合总是通过统一的方式——迭代器（Iterator）来实现，它最明显的好处在于无需知道集合内部元素是按什么方式存储

::: tip 提示

由于Java的集合设计非常久远，中间经历过大规模改进，我们要注意到有一小部分集合类是遗留类，不应该继续使用：

- `Hashtable`：一种线程安全的`Map`实现；
- `Vector`：一种线程安全的`List`实现；
- `Stack`：基于`Vector`实现的`LIFO`的栈。

还有一小部分接口是遗留接口，也不应该继续使用：

- `Enumeration<E>`：已被`Iterator<E>`取代。

:::



## 泛型

泛型是JDK1.5以后增加的，它可以帮助我们建立类型安全的集合。在使用了泛型的集合中，遍历时不必进行强制类型转换。JDK提供了支持泛型的编译器，将运行时的类型检查提前到了编译时执行，提高了代码可读性和安全性。

泛型的本质就是“数据类型的参数化”。 我们可以把“泛型”理解为数据类型的一个占位符(形式参数)，即告诉编译器，在调用泛型时必须传入实际类型。

 为了能够更好的学习集合，建议先学习**泛型**。

-  [Java泛型学习笔记](generics.md)   
-   [w3cschool教程](https://www.w3cschool.cn/java/java-generics.html)

## Collection接口

Collection 表示一组对象，它是集中、收集的意思。Collection接口是List、Set接口的父接口，也就是List、Set都包含Collection中的方法，可以在List、Set接口的实现类中进行测试。


Collection的功能:

1、添加功能

`boolean add (objcet obj)`:添加一个元素

`boolean addAll(Collection c)`:添加一个集合的元素

2、删除功能:

`void clear ()`:清除所有的元素

`boolean remove (object)`:移除一个元素

`boolean removeAll(Collection c)`:移除本集合和集合c中都包含的元素

3、判断功能:

`boolean contains (0bject o)`:判断集合是否包含该元素

`boolean containsAll(Collection c)`:判断集合中是否包含指定的集合元素，只有包含所有的元素,才叫包含

`boolean isEmpty()`:判断集合是否为空

4、获取功能:

`Iterator<E>iterator()`:迭代器

`Object[] toArray()`:转化成Object数组

5、长度功能:

`int size()`:元素的个数

6、交集功能:

`boolean retainAll(Collection c)`:取本集合和集合c都包含的元素



Collection 类图（工作中需要掌握一些常用的集合类就行了）



## List接口及其实现类

 List是有序、可重复的容器。

**有序**：List中每个元素都有索引标记。可以根据元素的索引标记(在List中的位置)访问元素，从而精确控制这些元素。

**可重复**：List允许加入重复的元素。更确切地讲，List通常允许满足 e1.equals(e2) 的元素重复加入容器。

 除了Collection接口中的方法，List多了一些跟顺序(索引)有关的方法

| 方法                                  | 说明                                               |
| ------------------------------------- | -------------------------------------------------- |
| void add (int index, Object element)  | 在指定位置插入元素，以前元素全部后移一位           |
| Object set (int index,Object element) | 修改指定位置的元素                                 |
| Object get (int index)                | 返回指定位置的元素                                 |
| Object remove (int index)             | 删除指定位置的元素，后面元素全部前移一位           |
| int indexOf (Object o)                | 返回第一个匹配元素的索引，如果没有该元素，返回-1.  |
| int lastIndexOf (Object o)            | 返回最后一个匹配元素的索引，如果没有该元素，返回-1 |















