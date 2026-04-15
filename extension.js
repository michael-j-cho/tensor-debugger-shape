const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Tensor Debugger Shape extension is now active');

    // Track debug sessions and inject the patch
    const debugSessionTracker = vscode.debug.onDidStartDebugSession(async (session) => {
        // Check if this is a Python debug session
        if (session.type !== 'python' && session.type !== 'debugpy') {
            return;
        }

        // Check if the feature is enabled
        const config = vscode.workspace.getConfiguration('tensorDebuggerShape');
        if (!config.get('enabled') || !config.get('autoInject')) {
            return;
        }

        console.log('Python debug session started, injecting tensor shape patch...');

        // Wait for the debugger to fully initialize
        await new Promise(resolve => setTimeout(resolve, 500));

        // Read the patch script
        const patchScriptPath = path.join(context.extensionPath, 'tensor_shape_patch.py');
        
        if (!fs.existsSync(patchScriptPath)) {
            vscode.window.showErrorMessage('Tensor shape patch script not found');
            return;
        }

        const patchCode = fs.readFileSync(patchScriptPath, 'utf8');

        // Try to evaluate the patch code in the debug console
        try {
            // Use the debug console to execute the code (as multi-line)
            await session.customRequest('evaluate', {
                expression: patchCode,
                context: 'repl'
            });

            console.log('Tensor shape patch injected successfully');
            
            // Show a subtle notification
            vscode.window.setStatusBarMessage('$(check) Tensor shapes enabled in debugger', 3000);
        } catch (error) {
            console.error('Failed to inject tensor shape patch:', error);
            // Don't show error to user as it might not be using torch
        }
    });

    context.subscriptions.push(debugSessionTracker);

    // Register a command to manually inject the patch
    const injectCommand = vscode.commands.registerCommand('tensorDebuggerShape.inject', async () => {
        const session = vscode.debug.activeDebugSession;
        
        if (!session) {
            vscode.window.showWarningMessage('No active debug session');
            return;
        }

        if (session.type !== 'python' && session.type !== 'debugpy') {
            vscode.window.showWarningMessage('Not a Python debug session');
            return;
        }

        const patchScriptPath = path.join(context.extensionPath, 'tensor_shape_patch.py');
        const patchCode = fs.readFileSync(patchScriptPath, 'utf8');

        try {
            await session.customRequest('evaluate', {
                expression: patchCode,
                context: 'repl'
            });

            vscode.window.showInformationMessage('Tensor shape patch injected!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to inject patch: ${error.message}`);
        }
    });

    context.subscriptions.push(injectCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
