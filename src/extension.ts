'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { promisify } from 'util';
import * as fs from 'fs';

import './templates/stateful_widget/templateWidget';
import './templates/stateful_widget/templateWidgetView';
import './templates/stateful_widget/templateWidgetViewModel';
import getWidgetData from './templates/stateful_widget/templateWidget';
import getWidgetViewData from './templates/stateful_widget/templateWidgetView';
import getWidgetViewModelData from './templates/stateful_widget/templateWidgetViewModel';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

export function activate(context: vscode.ExtensionContext) {

    let generateStatefulWidgetCmd = vscode.commands.registerCommand('extension.generateStatefulWidget', () => {
        generateStatefulWidget();
    });

    // context.subscriptions.push(disposable);
    context.subscriptions.push(generateStatefulWidgetCmd);
}

export function deactivate() {
}

// Options for folder selection dialog
const dialogOptions: vscode.OpenDialogOptions = {
    canSelectFiles: false,
    canSelectMany: false,
    canSelectFolders: true
};

// Options for input dialog
const inputBoxOptions: vscode.InputBoxOptions = {
    placeHolder: 'MyAwesomeWidget',
    prompt: 'Input your widget name in camel case.'
};

// Function for opening and getting the path to save the files
async function openFolderSelectionDialog(): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve, reject) => {
        vscode.window.showOpenDialog(dialogOptions).then( folderUri => {
            if (folderUri && folderUri[0]) {
                resolve(folderUri[0].fsPath);
            } else {
                resolve(undefined);
            }
        }); 
    });
}

async function generateStatefulWidget() {
    const widgetName = await vscode.window.showInputBox(inputBoxOptions);
    if (widgetName === undefined) {
        vscode.window.showErrorMessage('Invalid widget name');
        return;
    }
    
    const path = await openFolderSelectionDialog();
    if (path === undefined) {
        vscode.window.showErrorMessage('Invalid path');
    }
    
    const folderAndFileName = widgetName.split(/(?=[A-Z])/).join('_').toLowerCase();
    const folderPath = path + '/' + folderAndFileName;       

    try {
        // TODO: Deal with the situation when folder exist
        await mkdir(folderPath);
    } catch(error) {
        vscode.window.showErrorMessage('Something went wrong');
        return;
    }
    
    // Write WidgetFile
    const widgetData = getWidgetData(widgetName, folderAndFileName);
    const widgetViewData = getWidgetViewData(widgetName, folderAndFileName);
    const widgetViewModelData = getWidgetViewModelData(widgetName, folderAndFileName);
    
    try {
        await writeFile(folderPath + '/' + folderAndFileName + '.dart', widgetData, 'utf8');
        await writeFile(folderPath + '/' + folderAndFileName + '_view' + '.dart', widgetViewData, 'utf8');
        await writeFile(folderPath + '/' + folderAndFileName + '_view_model' + '.dart', widgetViewModelData, 'utf8');
    } catch(error) {
        vscode.window.showErrorMessage('Something went wrong');
        return;
    }
}
