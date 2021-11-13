export default function getWidgetViewData(widgetName: string, fileName: string) {
  return `import 'package:flutter/material.dart';
import './${fileName}_view_model.dart';
  
class ${widgetName}View extends ${widgetName}ViewModel {
    
  @override
  Widget build(BuildContext context) {
    
    // Replace this with your build function
    return const Text('Just a placeholder');
  }
}

`;
}
