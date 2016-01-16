### Unified diffs

```diff
diff --git a/index.html b/index.html
index d80dce7..01922d9 100644
--- a/index.html
+++ b/index.html
@@ -8,6 +8,7 @@
 		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"/>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
 		<link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
+		<script src="/node_modules/prismjs-package/themes/prism.css"></script>
 		<link rel="stylesheet" href="/build/styles.css"/>
   </head>
   <body>
diff --git a/lib/change.js b/lib/change.js
index 98f814c..7f1d473 100644
--- a/lib/change.js
+++ b/lib/change.js
@@ -13,18 +13,23 @@ var _style = require('./style');

 var _style2 = _interopRequireDefault(_style);

+var _prismjsPackage = require('prismjs-package');
+
+var _prismjsPackage2 = _interopRequireDefault(_prismjsPackage);
+
 function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 function Change(props) {
 	var ln1 = props.normal ? props.ln1 : props.ln;
 	var ln2 = props.normal ? props.ln2 : props.ln;

-	// TODO highlight with prism.js
 	var html = props.content;

-	// try {
-	//   html = highlight(props.lang, props.content).value;
-	// } catch (e) {}
+	try {
+		html = (0, _prismjsPackage2.default)(props.content, props.lang);
+	} catch (e) {
+		console.log('highlight error:', e);
+	}

 	return _react2.default.createElement(
 		'tr',
diff --git a/lib/diffview.js b/lib/diffview.js
index c2627f7..05f09d3 100644
--- a/lib/diffview.js
+++ b/lib/diffview.js
@@ -47,7 +47,7 @@ function Part(props) {

 	return _react2.default.createElement(
 		'article',
-		null,
+		{ className: _style2.default.diff },
 		_react2.default.createElement(
 			'header',
 			null,
diff --git a/package.json b/package.json
index 8940bd8..60eeb02 100644
--- a/package.json
+++ b/package.json
@@ -28,7 +28,8 @@
     "classnames": "^2.2.3",
     "lang-map": "^0.4.0",
     "lodash": "^4.0.0",
-    "parse-diff": "^0.3.1",
+    "parse-diff": "^0.3.2",
+    "prismjs-package": "^0.6.1",
     "react": "^0.14.6",
     "react-dom": "^0.14.6"
   },
diff --git a/src/change.js b/src/change.js
index 1a78188..f86ea4d 100644
--- a/src/change.js
+++ b/src/change.js
@@ -1,16 +1,18 @@
 import React from 'react';
 import style from './style';
+import highlight from 'prismjs-package';

 export default function Change(props) {
 	const ln1 = props.normal ? props.ln1 : props.ln;
 	const ln2 = props.normal ? props.ln2 : props.ln;

-	// TODO highlight with prism.js
-	const html = props.content;
+	let html = props.content;

-  // try {
-  //   html = highlight(props.lang, props.content).value;
-  // } catch (e) {}
+	try {
+		html = highlight(props.content, props.lang);
+	} catch (e) {
+		console.log('highlight error:', e);
+	}

 	return (
 		<tr className={props.type}>
diff --git a/src/diffview.js b/src/diffview.js
index 20e5262..b579a44 100644
--- a/src/diffview.js
+++ b/src/diffview.js
@@ -17,7 +17,7 @@ function Part(props) {
 	});

 	return (
-		<article>
+		<article className={style.diff}>
 			<header>
 				<span className={style.adds}>+++ {additions}</span>
 				<span className={style.dels}>--- {deletions}</span>
```
