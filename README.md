# Tensor Debugger Shape

A VS Code extension that automatically displays PyTorch tensor shapes and dtypes in the debugger's variable window.

## Features

- 🔍 **Automatic Shape Display**: Shows tensor shapes like `[2, 3, 4]` directly in the debugger variable window
- 📊 **Data Type Information**: Displays dtype (e.g., `torch.float32`) alongside shapes
- ⚡ **Zero Configuration**: Works automatically when you start debugging Python code
- 🎯 **Non-Intrusive**: Only activates during Python debug sessions

## How It Works

When you start debugging Python code, this extension automatically injects a small patch that modifies `torch.Tensor.__repr__` to display shape and dtype information prominently in the debugger.

**Before:**
```
tensor([[1., 2., 3.]])
```

**After:**
```
[1, 3] torch.float32 | tensor([[1., 2., 3.]])
```

## Usage

1. Install the extension
2. Start debugging your Python code that uses PyTorch
3. Check the Variables panel - tensor shapes will now be visible!

### Manual Injection

If you need to inject the patch manually during a debug session:

1. Open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)
2. Run: `Tensor Debugger Shape: Inject Patch`

## Configuration

You can configure the extension in VS Code settings:

- `tensorDebuggerShape.enabled`: Enable/disable the extension (default: `true`)
- `tensorDebuggerShape.autoInject`: Automatically inject patch on debug start (default: `true`)

## Requirements

- VS Code 1.70.0 or higher
- Python with PyTorch installed
- Python debugger extension (ms-python.python or ms-python.debugpy)

## Development

To run the extension locally:

```bash
# Install dependencies
npm install

# Open in VS Code
code .

# Press F5 to open a new Extension Development Host window
```

## Known Limitations

- Only works with PyTorch tensors
- Patch is applied per-session (not persistent across restarts)
- May not work if torch is imported after debugging starts

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
# tensor-debugger-shape
