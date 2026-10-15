import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => (
  <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
    <DialogTitle className="font-semibold">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions className="px-6 pb-4">
      <Button onClick={onClose} disabled={loading} color="inherit">
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        disabled={loading}
        color="error"
        variant="contained"
        disableElevation
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
      >
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
