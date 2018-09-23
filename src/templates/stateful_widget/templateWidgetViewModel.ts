export default function getWidgetViewModelData(widgetName: string, fileName: string) {
  return `import 'package:flutter/material.dart';
import './${fileName}.dart';

abstract class ${widgetName}ViewModel extends State<${widgetName}> {
  // Add your state and logic here
}
`;
}
