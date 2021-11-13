export default function getWidgetData(widgetName: string, fileName: string): string {
  return `import 'package:flutter/material.dart';
import './${fileName}_view.dart';

class ${widgetName} extends StatefulWidget {
  const ${widgetName}({Key? key}) : super(key: key);

  @override
  ${widgetName}View createState() => ${widgetName}View();
}
  
`;
}
