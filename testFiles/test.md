# Markdown 是什么

> We believe that writing is about content, about what you want to say – not about fancy formatting.
>
> 我们坚信写作写的是内容，所思所想，而不是花样格式。 — Ulysses

Markdown 是一种**轻量级标记语言**，文件后缀名 .md, .markdown，允许人们使用易读易写的**纯文本格式**编写文档，然后转换成有效的**XHTML（或者HTML）文档**,也支持导出 WORD、PDF、图片等多种类型文件。当前许多网站都广泛使用 Markdown 来撰写帮助文档或是用于论坛上发表消息。

## Markdown 特点

**首先**，Markdown 是一种纯文本格式，因此特别适合于 Git 进行版本控制。
想象一个项目有一个图文并茂的描述文档，doc 格式，大小5M。现在我们面临一个抉择——是把它放到 Git 上还是网盘上呢？

如果放到 Git 上，那么对这个文档的一丁点更改都会引起一个5M大小的二进制文件的改变。非常浪费；如果放到网盘上，那么这个文档就会丢失大量的版本信息。重要的改动经常需要手动备份来保留。非常麻烦。

但是用 Markdown 之后，文档就和代码一样是一行行的纯文本；图片之类的资源是外链的，不改动图片本身就不会产生提交。这就大大提高了版本控制的效率。文档可以像代码一样享受版本控制的优点了。

**其次**，Markdown 在设计时就考虑了可读性(这里隆重对比另一种能纯文本写出格式的语言 LaTeX，虽然二者目的原理都完全不同)，例如下面这段 Markdown 代码：

    ```Markdown
    # Sec 1
    ## Sec 1.1
    The *quick* brown fox jumps over the **lazy** dog.
    ```

对于一个没接触过 Markdown 的人来说这段话也不难理解。有一些奇怪的星号，但是不影响我们找到正文。而如果是 LaTeX 的话，要写成如下：

    ```Latex
    \documentclass{article}
    \begin{document}
    \section{Sec 1}
    \subsection{Sec 1.1}
    The \emph{quick} brown fox jumps over the {\bfseries lazy} dog.
    \end{document}
    ```

不加语法高亮初学者连正文和 LaTeX 命令都分不开。

Markdown 的语法之所以如此简洁，一方面是因为用一些简单的符号代替了繁杂的格式描述，另一方面是因为 Markdown 本身不关心自己会被如何显示，而是将显示的工作交给了预览工具。（这和 LaTeX 完全相反。）这也是接下来要说的：

**第三**，Markdown 在显示时会被预览工具翻译为 HTML。

比如`# XXX`会被翻译为`<h1>XXX</h1>`。

这一点非常了不起，因为：

* Markdown 是 HTML 的一种简写，在显示时会“解压缩”成 HTML。理论上可以在 Markdown 里直接插入合法的 HTML 块，他们会成为最终的 HTML 的一部分，做到 Markdown 本身做不到的事。
* Markdown 的格式可以由 CSS 描述
    * 预览工具或者用户可以自己决定用什么 CSS 显示，怎么好看怎么来
    * CSS 是可以怼天怼地怼空气的……

# Markdown 语法
## 标题

使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推。

> \# 一级标题  
>
> \#\# 二级标题 
>
> \#\#\# 三级标题  
>
> \#\#\#\# 四级标题  
>
> \#\#\#\#\# 五级标题  
>
> \#\#\#\#\#\# 六级标题  

## 段落

Markdown 段落没有特殊的格式，直接编写文字就好，**段落的换行是使用两个以上空格加上回车或在段落后面使用一个空行**。

## 字体

Markdown 的正文有不少可以使用的标记，比如说**加粗**和*斜体*，分别通过`**加粗**`或`__加粗__`，`*斜体*`或`_斜体_`实现

如果你愿意，当然不是不可以***两个一起啦***，通过`***两个一起啦***`或`___两个一起啦___`实现

当然了，还有另一种标记呢！~~文字还可以加删除线喔~~√，只需在文字的两端加上两个波浪线 `~~` 即可

下划线可以通过 HTML 的< u >标签来实现：<u>这句话是要带下划线的文本</u>

在文字的两端加上单个次方符号`^`或单个波浪线`~`可表示上下标，如2^10^=1024，a~2~

## 脚注

脚注是对文本的补充说明。可作为文档某处内容的注释或列出引文的出处等。

Markdown 脚注的格式如下:

> [^要注明的文本]

以下实例演示了脚注的用法：

    ```Markdown
    Markdown 的百度百科在这 [^百度百科]。
    [^百度百科]: [markdown - 百度百科](https://baike.baidu.com/item/markdown/3245829?fr=aladdin)
    ```

此脚注中插入了一个链接，演示效果如下：

Markdown 的百度百科在这 [^百度百科]。
[^百度百科]: [markdown - 百度百科](https://baike.baidu.com/item/markdown/3245829?fr=aladdin)

## 分割线

可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

> \*\*\*
>
> \* \* \*
>
> \*\*\*\*\*
>
> \- \- \-
>
> \-\-\-\-\-

显示效果如下所示：

---

## 列表
Markdown 支持有序列表和无序列表。

无序列表使用星号(*)、加号(+)或是减号(-)作为列表标记，这些标记后面要添加一个空格，然后再填写内容：

* 第一项
* 第二项
* 第三项

有序列表使用数字并加上.号来表示，如：

1. 第一项
2. 第二项
3. 第三项

列表嵌套只需在子列表中的选项前面添加四个空格即可：

1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素

## 引用或区块

开头使用 > 符号 ，然后后面紧跟一个空格符号

> 引用的文字是这样放进来的。
> 这个标记有一个特点，既可以每一行加一个，也可以一次管很多行，就像这样。

当然啦，如果一直这样没完没了下去也不好。怎么办呢？中间空一行就好了√

> 多层嵌套的话，就像这样。
> > 一层，又一层。
> >
> > >一层，一层，又一层

如果要终止，依然需要多空一行。【摊手

如果要在列表项目内放进区块，那么就需要在 > 前添加四个空格的缩进。

## 图片

Markdown 图片语法格式如下：

    ![alt 属性文本](图片地址)
    ![alt 属性文本](图片地址 "可选标题")
    ![alt 属性文本](图片地址#pic_center)      居中的图片
    ![alt 属性文本](图片地址#pic_left)
    ![alt 属性文本](图片地址#pic_right)
    ![alt 属性文本](图片地址 =30x30)    带尺寸的图片
    ![alt 属性文本](图片地址#pic_center =30x30)    居中并且带尺寸的图片


* 开头一个感叹号 !
* 接着一个方括号，里面放上图片的描述文本,不会显示出来,仅仅用于图片无法显示的时候
* 接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上选择性的 'title' 属性的文字。

![快看这个小姐姐x](https://cdn.jsdelivr.net/gh/yang-tian-hub/PictureBed/快看这个小姐姐x.jpg#pic_center =250x250)

## 链接

链接使用方法如下：

    [链接名称](链接地址)
    或
    <链接地址>

这是一个[Markdown **在线编辑器**](https://tool.lu/markdown/),
这是一个 Markdown 教程<https://www.runoob.com/markdown/md-tutorial.html>

## 表格

Markdown 制作表格使用 | 来分隔不同的单元格，使用 - 来分隔表头和其他行。语法格式如下:

    |  表头   | 表头  |
    |  ----  | ----  |
    | 单元格  | 单元格 |
    | 单元格  | 单元格 |

以上代码显示结果如下：

| 表头   | 表头   |
| ------ | ------ |
| 单元格 | 单元格 |
| 单元格 | 单元格 |

我们可以设置表格的对齐方式,实例如下：

    | 左对齐 | 右对齐 | 居中对齐 |
    | :-----| ----: | :----: |
    | 单元格 | 单元格 | 单元格 |
    | 单元格 | 单元格 | 单元格 |

以上代码显示结果如下：

| 左对齐 | 右对齐 | 居中对齐 |
| :----- | -----: | :------: |
| 单元格 | 单元格 |  单元格  |
| 单元格 | 单元格 |  单元格  |

## 代码

如果是段落上的一个函数或片段的代码可以用反引号把它包起来（\`），例如：`printf()`函数

代码区块使用 4 个空格或者一个制表符<kbd>TAB</kbd>。
也可以用 ```包裹一段代码，并指定一种语言（也可以不指定）：

    ```javascript
    $(document).ready(function () {
        alert('RUNOOB');
    });
    ```

## 支持Html元素

* **键盘** `<kbd>测试一下</kbd>`  
    效果：<kbd>测试一下</kbd>

* **加粗** `<s>测试一下</s>`  
    效果：<s>测试一下</s>

* **斜体** `<i>测试一下</i>`  
    效果：<i>测试一下</i>

* **换行** `测试<br />一下`  
    效果：测试<br />一下

* **标记** `<mark>测试一下</mark>`  
    效果：<mark>测试一下</mark>

* **空格** `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;测试一下`  
    效果：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;测试一下  
    此分号为英文分号，Markdown不推荐使用此方法,在全角输入状态下直接使用空格键就行了

* **删除线** `<s>测试一下</s>`  
    效果：<s>测试一下</s>

* **下划线** `<u>测试一下</u>`  
    效果：<u>测试一下</u>

* **字体增大** `<big>测试一下</big>`  
    效果：<big>测试一下</big>

* **字体减小** `<small>测试一下</small>`  
    效果：<small>测试一下</small>

* **文字上标** `测试<sup>一下</sup>`  
    效果：测试<sup>一下</sup>

* **文字下标** `测试<sub>一下</sub>`  
    效果：测试<sub>一下</sub>

* **右对齐** `<p align=right>测试一下</p>`  
    效果：  
<p align=right>测试一下</p>

* **文字居中** `<center>测试一下</center>`  
    效果：  
<center>测试一下</center>

* **图片居中** `<p align="center"><img src="https://github.com/SmallTeddy/vue3-preview/blob/main/testFiles/test.jpg" width="80%"></p>`  
    效果：  
<p align="center"><img src="https://cdn.jsdelivr.net/gh/yang-tian-hub/PictureBed/140158585091919.jpg" width="60%"></p>

## 转义

Markdown 使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用转义字符，Markdown 使用反斜杠转义特殊字符：
    ```
    **文本加粗**
    \*\* 正常显示星号 \*\*
    ```
输出结果为：
> **文本加粗**  
> \*\* 正常显示星号 \*\*

Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：
> \\   反斜线  
> \`   反引号  
> \*   星号  
> \_   下划线  
> \{}  花括号  
> \[]  方括号  
> \()  小括号  
> \#   井字号  
> \+   加号  
> \-   减号  
> \.   英文句点

## 公式

VScode 内置的 Markdown Preview 工具使用 KaTeX 或者 MathJax 来渲染数学表达式。

`$...$` 中的数学表达式将会在行内显示，`$$...$$` 中的数学表达式将会在块内显示。

下面的代码可以用来生成一些简单的公式

    ```Markdown
    $$\left. \boldsymbol{i}_{dq}(k + 1) \right|_j=\boldsymbol{i}_{dq}(k)+T_s\left[ {\bar \alpha {\left. \boldsymbol{u}_{dq}(k) \right|}_j + \hat {\boldsymbol{F}}_{dq}(k)} \right]$$
    
    where, $\hat {\boldsymbol{F}}_{dq}(k)$ denotes the estimated value of the unknown disturbances at the $k$-th control period; $T_s$ is the control period.
    ```

代码运行结果如下：

$$\left. \boldsymbol{i}_{dq}(k + 1) \right|_j=\boldsymbol{i}_{dq}(k)+T_s\left[ {\bar \alpha {\left. \boldsymbol{u}_{dq}(k) \right|}_j + \hat {\boldsymbol{F}}_{dq}(k)} \right]$$

where, $\hat {\boldsymbol{F}}_{dq}(k)$ denotes the estimated value of the unknown disturbances at the $k$-th control period; $T_s$ is the control period.

## 注释

1. 使用html标签（此设定并不是所有的浏览器或者平台都支持）  
`<div style='display: none'>哈哈我是注释，不会在浏览器中显示。</div>`  
你如果看不到下面的注释说明已经成功注释  
<div style='display: none'>哈哈我是注释，不会在浏览器中显示。</div>  

2. 使用html注释  
`<!--哈哈我是注释，不会在浏览器中显示。-->`  
你如果看不到下面的注释说明已经成功注释  
<!--哈哈我是注释，不会在浏览器中显示。-->