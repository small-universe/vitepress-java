# JavaSE-正则表达式


## 一、概述

- 用来描述或者匹配一系列符合某个语句规则的字符串



## 二、单字符匹配

单个字符的匹配规则主要有:

| 正则表达式 | 规则                     | 可以匹配                         |
| :--------- | :----------------------- | :------------------------------- |
| `A`        | 指定字符                 | `A`                              |
| `\u548c`   | 指定Unicode字符          | `和`                             |
| `.`        | 任意字符                 | `a`，`b`，`&`，`0`               |
| `\d`       | 数字0~9                  | `0`~`9`                          |
| `\w`       | 大小写字母，数字和下划线 | `a`\~`z`，`A`\~`Z`，`0`~`9`，`_` |
| `\s`       | 空格、Tab键              | 空格，Tab                        |
| `\D`       | 非数字                   | `a`，`A`，`&`，`_`，……           |
| `\W`       | 非\w                     | `&`，`@`，`中`，……               |
| `\S`       | 非\s                     | `a`，`A`，`&`，`_`，……           |

**快捷符号**

1、`\d`表示`[0—9]`

2、`\D`表示`[^0—9]`

3、`\w`表示`[0—9A—Z_a—z]`

4、`\W`表示`[^0—9A—Z_a—z]`

5、`\s`表示`[\t\n\r\f]`

6、`\S`表示`[^\t\n\r\f]`

## 三、多字符匹配

多个字符的匹配规则主要有：

| 正则表达式 | 规则             | 可以匹配                 |
| :--------- | :--------------- | :----------------------- |
| `A*`       | 任意个数字符     | 空，`A`，`AA`，`AAA`，…… |
| `A+`       | 至少1个字符      | `A`，`AA`，`AAA`，……     |
| `A?`       | 0个或1个字符     | 空，`A`                  |
| `A{3}`     | 指定个数字符     | `AAA`                    |
| `A{2,3}`   | 指定范围个数字符 | `AA`，`AAA`              |
| `A{2,}`    | 至少n个字符      | `AA`，`AAA`，`AAAA`，……  |
| `A{0,3}`   | 最多n个字符      | 空，`A`，`AA`，`AAA`     |



## 四、复杂匹配

复杂匹配规则主要有：

| 正则表达式 | 规则                 | 可以匹配                             |
| :--------- | :------------------- | :----------------------------------- |
| ^          | 开头                 | 字符串开头                           |
| $          | 结尾                 | 字符串结束                           |
| [ABC]      | […]内任意字符        | A，B，C                              |
| [A-F0-9xy] | 指定范围的字符       | `A`，……，`F`，`0`，……，`9`，`x`，`y` |
| [^A-F]     | 指定范围外的任意字符 | 非`A`~`F`                            |
| AB\|CD\|EF | AB或CD或EF           | `AB`，`CD`，`EF`                     |

## 五、分组匹配

`(...)`可以用来把一个子规则括起来，这样写`learn\s(java|php|go)`就可以更方便地匹配

`learn java`、`learn php`  、 `learn go`这样的长字符串了

除此以外，`(...)`还有一个重要作用，就是分组匹配



用`(...)`先把要提取的规则分组，把上述正则表达式变为像`(^0\d{2})-(\d{6,8})`这样。

现在问题又来了：匹配后，如何按括号提取子串？

现在我们没办法用`String.matches()`这样简单的判断方法了，必须引入`java.util.regex`包，用`Pattern`对象匹配，匹配后获得一个`Matcher`对象，如果匹配成功，就可以直接从`Matcher.group(index)`返回子串：

```java
public class Main {
    public static void main(String[] args) {
        //匹配国内的电话号码规则：3~4位区号加7~8位电话，中间用-连接，且国内区号必须以0开头
        //例如：010-12345678
        Pattern p = Pattern.compile("(^0\\d{2,3})-(\\d{7,8})");
        Matcher m = p.matcher("010-12345678");
        if (m.matches()) {
            String g1 = m.group(1);
            String g2 = m.group(2);
            System.out.println(g1);
            System.out.println(g2);
        } else {
            System.out.println("匹配失败!");
        }
    }
}
```

::: warning

区分三个概念，原串，正则表达式，java字符串

原串是a&c，那么由于&在正则表达式中属于特殊字符，因此正则表达式中需要转义，即写为a\&c

又因为java字符串中，\也是特殊字符，因此需要转义写成\\，综合写就是a\\&c

所以java字符串"a\\&c"表示的正则表达式为"a\&c"，表示的原串内容为"a&c"

:::

::: info

正则表达式代码可以使用`String.matches()`方法，而我们在分组提取的代码中用的是`java.util.regex`包里面的`Pattern`类和`Matcher`类。实际上这两种代码本质上是一样的，因为`String.matches()`方法内部调用的就是`Pattern`和`Matcher`类的方法。

:::

但是反复使用`String.matches()`对同一个正则表达式进行多次匹配效率较低，因为每次都会创建出一样的`Pattern`对象。完全可以先创建出一个`Pattern`对象，然后反复使用，就可以实现编译一次，多次匹配,如下示例：

```java
public class Main {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("(^0\\d{2,3})-(\\d{7,8})");
        pattern.matcher("010-12345678").matches(); // true
        pattern.matcher("021-123456").matches(); // true
        pattern.matcher("022#1234567").matches(); // false
        // 获得Matcher对象:
        Matcher matcher = pattern.matcher("010-12345678");
        if (matcher.matches()) {
            String whole = matcher.group(0); // "010-12345678", 0表示匹配的整个字符串
            String area = matcher.group(1); // "010", 1表示匹配的第1个子串
            String tel = matcher.group(2); // "12345678", 2表示匹配的第2个子串
            System.out.println(area);
            System.out.println(tel);
        }
    }
}

```



## 六、非贪婪匹配

### （一）贪婪匹配

在介绍非贪婪匹配之前必须了解什么是贪婪匹配：

::: tip 贪婪匹配

正则表达式默认使用贪婪匹配：任何一个规则，它总是尽可能多地向后匹配

:::

**案例分析：**

期望将将字符串末尾的所有0提取，想到使用分组匹配，正则：`(\d+)(0*)`

```java
public class Main {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("(\\d+)(0*)");
        Matcher matcher = pattern.matcher("1230000");
        if (matcher.matches()) {
            System.out.println("group1=" + matcher.group(1)); // "1230000"
            System.out.println("group2=" + matcher.group(2)); // ""
        }
    }
}

```

我们期望分组匹配结果是：

| input  | `\d+`  | `0*`  |
| :----- | :----- | :---- |
| 123000 | "123"  | "000" |
| 10100  | "101"  | "00"  |
| 1001   | "1001" | ""    |

但实际的分组匹配结果是这样的：

| input  | `\d+`    | `0*` |
| :----- | :------- | :--- |
| 123000 | "123000" | ""   |
| 10100  | "10100"  | ""   |
| 1001   | "1001"   | ""   |

分析原因：

因为`\d+`确实可以匹配后面任意个`0`。正则表达式默认使用贪婪匹配，因此，`\d+`总是会把后面的`0`包含进来。

要让`\d+`尽量少匹配，让`0*`尽量多匹配，我们就必须让`\d+`使用非贪婪匹配。在规则`\d+`后面加个`?`即可表示非贪婪匹配。我们改写正则表达式为`(\d+?)(0*)`即可得到我们期望的结果。



### （二）非贪婪匹配

> 正则表达式`(\d??)(9*)`

注意`\d?`表示匹配0个或1个数字，后面第二个`?`表示非贪婪匹配。

给定字符串`"9999"`，匹配到的两个子串分别是`""`和`"9999"`，因为对于`\d?`来说，可以匹配1个`9`，也可以匹配0个`9`，但是因为后面的`?`表示非贪婪匹配，它就会尽可能少的匹配，结果是匹配了0个`9`。



::: tip 小结

正则表达式匹配默认使用贪婪匹配，给定一个匹配规则，加上`?`后就变成了非贪婪匹配。

注意区分`?`的含义：`\d??`。

:::

## 七、正则相关类

### （一）类

java.util.regex 包主要包括以下三个类：

- Pattern 类：

  pattern 对象是一个正则表达式的编译表示。Pattern 类没有公共构造方法。要创建一个 Pattern 对象，你必须首先调用其公共静态编译方法，它返回一个 Pattern 对象。该方法接受一个正则表达式作为它的第一个参数。如：

  ```java
   Pattern p = Pattern.compile("\\wo\\w");
  ```

- Matcher 类：

  Matcher 对象是对输入字符串进行解释和匹配操作的引擎。与Pattern 类一样，Matcher 也没有公共构造方法。你需要调用 Pattern 对象的 matcher 方法来获得一个 Matcher 对象。如：

  ```java
   Matcher m = p.matcher("hello regex");
  ```

- PatternSyntaxException：

  PatternSyntaxException 是一个非强制异常类，它表示一个正则表达式模式中的语法错误。

### （二）捕获组

正是上文提到的分组匹配，这里补充一些相关概念以及方法的使用

捕获组是通过从左至右计算其开括号来编号。例如，在表达式（（A）（B（C））），有四个这样的组：

- ((A)(B(C)))
- (A)
- (B(C))
- (C)

可以通过调用 matcher 对象的 groupCount 方法来查看表达式有多少个分组。groupCount 方法返回一个 int 值，表示matcher对象当前有多个捕获组。其实很简单，就是 ==看括号的层数，跟数据结构中提到的广义表深度类似==。

还有一个特殊的组（group(0)），它总是代表整个表达式。**该组不包括在 groupCount 的返回值中**。

**示例**：

```java
package regex;


import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertEquals;


class TemplateTest {

	@Test
	public void testIsValidTel() {
		Template t = new Template("Hello, ${name}! You are learning ${lang}!");
		Map<String, Object> data = new HashMap<>();
		data.put("name", "Bob");
		data.put("lang", "Java");
		assertEquals("Hello, Bob! You are learning Java!", t.render(data));
	}
	public static void main( String[] args ){

		// 按指定模式在字符串查找
		String line = "This order was placed for QT3000! OK?";
		String pattern = "(\\D*)(\\d+)(.*)";

		// 创建 Pattern 对象
		Pattern r = Pattern.compile(pattern);

		// 现在创建 matcher 对象
		Matcher m = r.matcher(line);
		if (m.find( )) {
			// 多少个分组
			System.out.println(m.groupCount());
			//特殊的组group(0)，它总是代表整个表达式。该组不包括在 groupCount 的返回值中
			System.out.println("Found value: " + m.group(0) );
			System.out.println("Found value: " + m.group(1) );
			System.out.println("Found value: " + m.group(2) );
			System.out.println("Found value: " + m.group(3) );
		} else {
			System.out.println("NO MATCH");
		}
	}
}
```

```markdown
结果：
3
Found value: This order was placed for QT3000! OK?
Found value: This order was placed for QT
Found value: 3000
Found value: ! OK?
```



## 八、Java 中正则表达式的应用

### （一）判断功能

- `public boolean matches(String regex)`

案例：判断录入的手机号是否为13或者18开头

```java
package Lemon;

import java.util.Scanner;

public class RegexDm {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入手机号：");
        String s = sc.nextLine();

        String regex = "1[38]\\d{9}";//定义手机好规则
        boolean flag = s.matches(regex);//判断功能
        System.out.println("flag:"+flag);
    }
}
```

### （二）分割功能

- `public String[] split(String regex)`

```java
"a b c".split("\\s"); // { "a", "b", "c" }
"a b  c".split("\\s"); // { "a", "b", "", "c" }
"a, b ;; c".split("[\\,\\;\\s]+"); // { "a", "b", "c" }
```

案例：

```java
package Lemon;

import java.util.Scanner;

public class RegexDm {
    public static void main(String[] args){
        String age = "18-24";//定义年龄范围
        String regex = "-";
        String[] strArr = age.split(regex);//分割成字符串数组

        int startAge = Integer.parseInt(strArr[0]);
        int endAge = Integer.parseInt(strArr[1]);

        Scanner sc = new Scanner(System.in);
        System.out.println("请输入您的年龄：");
        int a = sc.nextInt();
        if (a >= startAge && a <= endAge){
            System.out.println("你就是我想找的");
        }else{
            System.out.println("滚");
        }
    }
}
```

### （三）搜索功能

- `Matcher.find()`

```java
public class Main {
    public static void main(String[] args) {
        String s = "the quick brown fox jumps over the lazy dog.";
        Pattern p = Pattern.compile("\\wo\\w");
        Matcher m = p.matcher(s);
        while (m.find()) {
            String sub = s.substring(m.start(), m.end());
            System.out.println(sub);
        }
    }
}
/**
 * 输出结果：
 *row
 *fox
 *dog
 */
```

我们获取到`Matcher`对象后，不需要调用`matches()`方法（因为匹配整个串肯定返回false），而是反复调用`find()`方法，在整个串中搜索能匹配上`\\wo\\w`规则的子串，并打印出来。这种方式比`String.indexOf()`要灵活得多，因为我们搜索的规则是3个字符：中间必须是`o`，前后两个必须是字符`[A-Za-z0-9_]`。

### （四）替换功能

- `public String replaceAll(String regex,String replacement)`

案例：

```java
package Lemon;

public class RegexDm {
    public static void main(String[] args){
        String s = "12342jasfkgnas234";
        //把字符串里面的数字替换成*
        String regex = "\\d";
        String ss = "*";
        String result = s.replaceAll(regex,ss);
        System.out.println(result);
    }
}
```

### （五）反向引用

如果我们要把搜索到的指定字符串按规则替换，比如前后各加一个`<b>xxxx</b>`，这个时候，使用`replaceAll()`的时候，我们传入的第二个参数可以使用`$1`、`$2`来反向引用匹配到的子串。例如：

```java
public static void main(String[] args) {
    String s = "the quick brown fox jumps over the lazy dog.";
    String r = s.replaceAll("\\s([a-z]{4})\\s", " <b>$1</b> ");
    System.out.println(r);
}
}
// 运行结果：
// the quick brown fox jumps <b>over</b> the <b>lazy</b> dog.
```

::: tip

实现替换的关键就在于`" <b>$1</b> "`，它用匹配的分组子串`([a-z]{4})`替换了`$1`

:::

### （六）练习

模板引擎是指，定义一个字符串作为模板：

```java
Hello, ${name}! You are learning ${lang}!
```

其中，以`${key}`表示的是变量，也就是将要被替换的内容

当传入一个`Map<String, String>`给模板后，需要把对应的key替换为Map的value。

例如，传入`Map`为：

```java
{
    "name": "Bob",
    "lang": "Java"
}
```

然后，`${name}`被替换为`Map`对应的值"Bob”，`${lang}`被替换为`Map`对应的值"Java"，最终输出的结果为：

```java
Hello, Bob! You are learning Java!
```

请编写一个简单的模板引擎，利用正则表达式实现这个功能。

```java
package regex;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Learn Java from https://www.liaoxuefeng.com/
 *
 * @author liaoxuefeng
 */
public class Template {

	final String template;
	final Pattern pattern = Pattern.compile("\\$\\{(\\w+)\\}");

	public Template(String template) {
		this.template = template;
	}
	public String render(Map<String, Object> data) {
	    Matcher m = pattern.matcher(template);
	    StringBuffer sb=new StringBuffer();
	    while (m.find()) {
            //从头开始将template的字符复制到sb上直到有字符被替换。第一次复制完成，sb里面存的是“Hello, Bob”
            m.appendReplacement(sb,data.get(m.group(1)).toString());
	    }
	    //循环结束时sb里面存的是“Hello, Bob! You are learning java”
        m.appendTail(sb);//将最后一次替换后剩下的字符复制到sb上
        return sb.toString();//“Hello, Bob! You are learning java!”

	}
}
```

测试：

```java
package regex;


import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;


class TemplateTest {

	@Test
	public void testIsValidTel() {
		Template t = new Template("Hello, ${name}! You are learning ${lang}!");
		Map<String, Object> data = new HashMap<>();
		data.put("name", "Bob");
		data.put("lang", "Java");
		assertEquals("Hello, Bob! You are learning Java!", t.render(data));
	}
}

```



## 九、常用正则表达式

#### 元字符及其在正则表达式上下文中的行为

- `\` 将下一个字符标记为一个特殊字符、或一个原义字符、或一个后向引用、或一个八进制转义符。
- `^` 匹配输入字符串的开始位置。如果设置了 RegExp 对象的Multiline 属性，`^` 也匹配 `\n`或 `\r`之后的位置。
- `$` 匹配输入字符串的结束位置。如果设置了 RegExp 对象的Multiline 属性，`$` 也匹配 `\n`或 `\r`之前的位置。
- `*` 匹配前面的子表达式零次或多次。
- `+` 匹配前面的子表达式一次或多次。`+` 等价于 `{1,}`。
- `?` 匹配前面的子表达式零次或一次。`?` 等价于 `{0,1}`。
- `{n}` n 是一个非负整数，匹配确定的n 次。
- `{n,}` n 是一个非负整数，至少匹配n 次。
- `{n,m}` m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次。在逗号和两个数之间不能有空格。
- `?` 当该字符紧跟在任何一个其他限制符 `(*, +, ?, {n}, {n,}, {n,m})` 后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。
- `.` 匹配除 `\n`之外的任何单个字符。要匹配包括 `\n` 在内的任何字符，请使用象 `[.\n]`的模式。
- `(pattern)` 匹配pattern 并获取这一匹配。
- `(?:pattern)` 匹配pattern 但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。
- `(?=pattern)` 正向预查，在任何匹配 pattern 的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。
- `(?!pattern)` 负向预查，与`(?=pattern)`作用相反
- `x|y` 匹配 `x` 或 `y`。
- `[xyz]` 字符集合。
- `[^xyz]` 负值字符集合。
- `[a-z]` 字符范围，匹配指定范围内的任意字符。
- `[^a-z]` 负值字符范围，匹配任何不在指定范围内的任意字符。
- `\b` 匹配一个单词边界，也就是指单词和空格间的位置。
- `\B` 匹配非单词边界。
- `\cx` 匹配由x指明的控制字符。
- `\d` 匹配一个数字字符。等价于 `[0-9]`。
- `\D` 匹配一个非数字字符。等价于 `[^0-9]`。
- `\f` 匹配一个换页符。等价于 `\x0c` 和 `\cL`。
- `\n` 匹配一个换行符。等价于 `\x0a` 和 `\cJ`。
- `\r` 匹配一个回车符。等价于 `\x0d` 和 `\cM`。
- `\s` 匹配任何空白字符，包括空格、制表符、换页符等等。等价于`[ \f\n\r\t\v]`。
- `\S` 匹配任何非空白字符。等价于 `[^ \f\n\r\t\v]`。
- `\t` 匹配一个制表符。等价于 `\x09` 和 `\cI`。
- `\v` 匹配一个垂直制表符。等价于 `\x0b` 和 `\cK`。
- `\w` 匹配包括下划线的任何单词字符。等价于`[A-Za-z0-9_]`。
- `\W` 匹配任何非单词字符。等价于 `[^A-Za-z0-9_]`。
- `\xn` 匹配 `n`，其中 `n` 为十六进制转义值。十六进制转义值必须为确定的两个数字长。
- `\num` 匹配 `num`，其中`num`是一个正整数。对所获取的匹配的引用。
- `\n` 标识一个八进制转义值或一个后向引用。如果 `\n` 之前至少 n 个获取的子表达式，则 n 为后向引用。否则，如果 n 为八进制数字 (0-7)，则 n 为一个八进制转义值
- `\nm` 标识一个八进制转义值或一个后向引用。如果 `\nm` 之前至少有is preceded by at least nm 个获取得子表达式，则 nm 为后向引用。如果 `\nm` 之前至少有 n 个获取，则 n 为一个后跟文字 m 的后向引用。如果前面的条件都不满足，若 n 和 m 均为八进制数字 (0-7)，则 `\nm` 将匹配八进制转义值 `nm`
- `\nml` 如果 `n` 为八进制数字 (0-3)，且 `m` 和 `l` 均为八进制数字 (0-7)，则匹配八进制转义值 `nml`
- `\un` 匹配 `n`，其中 `n` 是一个用四个十六进制数字表示的Unicode字符。
- 匹配中文字符的正则表达式： `[u4e00-u9fa5]`
- 匹配双字节字符(包括汉字在内)：`[^x00-xff]`
- 匹配空行的正则表达式：`n[s| ]*r`
- 匹配HTML标记的正则表达式：`/<(.*)>.*</1>|<(.*) />/`
- 匹配首尾空格的正则表达式：`(^s*)|(s*$)`
- 匹配Email地址的正则表达式：`w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*`
- 匹配网址URL的正则表达式：`http://([w-]+.)+[w-]+(/[w- ./?%&=]*)?`



::: right 参考

[廖雪峰Java教程 - 正则表达式](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945288020320)

[菜鸟教程 - 正则表达式](https://www.runoob.com/java/java-regular-expressions.html)

:::