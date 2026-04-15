try:
    import torch
    
    # Save original methods
    _original_repr = torch.Tensor.__repr__
    _original_str = torch.Tensor.__str__
    
    # Create enhanced representation with shape and dtype
    def _enhanced_repr(self):
        shape_str = str(tuple(self.shape))
        return f"Tensor Shape: {shape_str} {_original_repr(self)}"
    
    def _enhanced_str(self):
        shape_str = str(tuple(self.shape))
        return f"Tensor Shape: {shape_str}\n{_original_str(self)}"
    
    # Patch both __repr__ and __str__
    torch.Tensor.__repr__ = _enhanced_repr
    torch.Tensor.__str__ = _enhanced_str
    
except ImportError:
    pass  # torch not available