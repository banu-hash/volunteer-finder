import { ExternalBlob, createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { CheckCircle, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ProofUploadFormProps {
  taskId: bigint;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FileItem {
  file: File;
  name: string;
  progress: number;
  done: boolean;
  blob?: ExternalBlob;
}

export function ProofUploadForm({
  taskId,
  onSuccess,
  onCancel,
}: ProofUploadFormProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { actor } = useActor(createActor);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    const newItems: FileItem[] = selected.map((f) => ({
      file: f,
      name: f.name,
      progress: 0,
      done: false,
    }));
    setFiles((prev) => [...prev, ...newItems]);
    e.target.value = "";
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function uploadAll(): Promise<ExternalBlob[]> {
    const blobs: ExternalBlob[] = [];
    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      const bytes = new Uint8Array(await item.file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, progress: pct } : f)),
        );
      });
      blobs.push(blob);
      setFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, done: true, blob } : f)),
      );
    }
    return blobs;
  }

  async function handleSubmit() {
    if (!actor) return toast.error("Not connected to backend");
    if (files.length === 0)
      return toast.error("Please add at least one proof file");

    setSubmitting(true);
    try {
      const blobs = await uploadAll();
      const ok = await actor.markTaskCompleted(taskId, blobs);
      if (ok) {
        toast.success("Task marked as completed with proof!");
        onSuccess();
      } else {
        toast.error("Failed to submit completion");
      }
    } catch {
      toast.error("Error submitting proof");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="space-y-3 border border-border rounded-xl p-4 bg-muted/30"
      data-ocid="proof.upload_form"
    >
      <p className="text-sm font-semibold text-foreground">Upload Proof</p>
      <p className="text-xs text-muted-foreground">
        Upload images or videos as proof of task completion.
      </p>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div
              key={`${f.name}-${i}`}
              className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2"
              data-ocid={`proof.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate text-foreground">
                  {f.name}
                </p>
                {!f.done && f.progress > 0 && (
                  <div className="w-full bg-muted rounded-full h-1 mt-1">
                    <div
                      className="bg-primary h-1 rounded-full transition-all"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                )}
                {f.done && (
                  <p className="text-xs text-success flex items-center gap-1 mt-0.5">
                    <CheckCircle size={10} /> Uploaded
                  </p>
                )}
              </div>
              {!submitting && (
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-0.5"
                  aria-label="Remove file"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload trigger */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-dashed"
        onClick={() => inputRef.current?.click()}
        disabled={submitting}
        data-ocid="proof.upload_button"
      >
        <Upload size={14} className="mr-1.5" />
        Add Files
      </Button>

      <div className="flex gap-2">
        <Button
          className="flex-1"
          onClick={handleSubmit}
          disabled={submitting || files.length === 0}
          data-ocid="proof.submit_button"
        >
          {submitting ? "Submitting..." : "Submit Proof"}
        </Button>
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={submitting}
          data-ocid="proof.cancel_button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
