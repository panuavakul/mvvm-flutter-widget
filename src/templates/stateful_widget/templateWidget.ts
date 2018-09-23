export default function getWidgetData(widgetName: string, fileName: string): string {
  return `import 'package:flutter/material.dart';
import './${fileName}_view.dart';

class ${widgetName} extends StatefulWidget {
  
  @override
  ${widgetName}View createState() => new ${widgetName}View();
}
  
`;
}
