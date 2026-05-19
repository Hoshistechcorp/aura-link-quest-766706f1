import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Trash2, Check, ImagePlus, Star, EyeOff, GripVertical, ExternalLink } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/aura/DashboardLayout";
import { useMicrositeContent, type ContentItem } from "@/contexts/MicrositeContentContext";
import { moduleConfigs, type ModuleConfig, type FieldConfig } from "@/lib/moduleConfigs";

const inputCls = "w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";
const labelCls = "text-xs font-medium text-muted-foreground mb-1.5 block";

const FieldInput = ({ field, item, onUpdate }: { field: FieldConfig; item: ContentItem; onUpdate: (patch: Partial<ContentItem>) => void }) => {
  if (field.type === "toggle") {
    return (
      <label className="flex items-center gap-2 text-sm py-2">
        <Switch checked={!!item[field.key]} onCheckedChange={(v) => onUpdate({ [field.key]: v })} />
        <span className="text-xs font-medium text-muted-foreground">{field.label}</span>
      </label>
    );
  }
  if (field.type === "image") {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || file.size > 5 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onloadend = () => onUpdate({ [field.key]: reader.result as string });
      reader.readAsDataURL(file);
    };
    return (
      <div>
        <label className={labelCls}>{field.label}</label>
        <div className="flex items-center gap-3">
          {item[field.key] ? (
            <div className="relative group">
              <img src={item[field.key]} alt="" className="w-20 h-20 rounded-xl object-cover border" />
              <button
                onClick={() => onUpdate({ [field.key]: "" })}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >×</button>
            </div>
          ) : (
            <label className="w-20 h-20 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-primary/10 transition-colors">
              <ImagePlus className="w-5 h-5 text-primary" />
              <span className="text-[9px] text-primary font-medium">Upload</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
          {!item[field.key] && (
            <div className="flex-1">
              <label className={labelCls}>Or paste image URL</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className={inputCls}
                onBlur={(e) => { if (e.target.value) onUpdate({ [field.key]: e.target.value }); }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <label className={labelCls}>{field.label}</label>
      {field.type === "textarea" ? (
        <textarea
          value={item[field.key] || ""}
          onChange={(e) => onUpdate({ [field.key]: e.target.value })}
          placeholder={field.placeholder}
          className={`${inputCls} resize-none`}
          rows={3}
          maxLength={field.maxLength}
        />
      ) : field.type === "select" ? (
        <select
          value={item[field.key] || ""}
          onChange={(e) => onUpdate({ [field.key]: e.target.value })}
          className={inputCls}
        >
          {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          type={field.type === "date" ? "date" : field.type === "time" ? "time" : "text"}
          value={item[field.key] || ""}
          onChange={(e) => onUpdate({ [field.key]: e.target.value })}
          placeholder={field.placeholder}
          className={inputCls}
          maxLength={field.maxLength}
        />
      )}
    </div>
  );
};

const ItemRow = ({ item, config, isEditing, onToggleEdit, onUpdate, onDelete }: {
  item: ContentItem;
  config: ModuleConfig;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdate: (patch: Partial<ContentItem>) => void;
  onDelete: () => void;
}) => {
  const firstField = config.fields.find((f) => f.type !== "image") || config.fields[0];
  const secondField = config.fields.filter((f) => f.type !== "image" && f.key !== firstField.key)[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl transition-all ${
        isEditing ? "bg-primary/5 border border-primary/30" : "bg-muted/30 border border-transparent hover:border-primary/20"
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            {config.fields.map((field) => (
              <div key={field.key} className={field.type === "image" || field.type === "textarea" || (!field.half && !field.third) ? "sm:col-span-2" : ""}>
                <FieldInput field={field} item={item} onUpdate={onUpdate} />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button onClick={onDelete} className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={onToggleEdit} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Done
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between cursor-pointer" onClick={onToggleEdit}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {item.image ? (
              <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
            ) : (
              <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0" />
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">{item[firstField.key] || `Untitled ${config.itemLabel}`}</span>
                {item.featured && <Star className="w-3 h-3 fill-aura-warning text-aura-warning shrink-0" />}
                {item.popular && <Star className="w-3 h-3 fill-aura-warning text-aura-warning shrink-0" />}
                {item.verified && <Check className="w-3 h-3 text-primary shrink-0" />}
                {item.active === false && <EyeOff className="w-3 h-3 text-muted-foreground shrink-0" />}
              </div>
              {secondField && (
                <p className="text-xs text-muted-foreground truncate">{item[secondField.key]}</p>
              )}
            </div>
          </div>
          {item.price && <span className="text-sm font-bold text-primary shrink-0 ml-2">${item.price}</span>}
        </div>
      )}
    </motion.div>
  );
};

const ModuleManagerPage = () => {
  const { module: moduleKey } = useParams<{ module: string }>();
  const navigate = useNavigate();
  const config = moduleKey ? moduleConfigs[moduleKey] : undefined;
  const { getItems, updateItem, addItem, deleteItem } = useMicrositeContent();
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!config) return <Navigate to="/dashboard" replace />;

  const items = getItems(config.contentType);

  const handleAdd = () => {
    const newItem = config.defaultItem();
    addItem(config.contentType, newItem);
    setEditingId(newItem.id);
  };

  const handleSave = () => {
    setEditingId(null);
    toast({ title: `${config.title} saved`, description: "Changes published to your microsite." });
  };

  const previewRoute = `/destination/${moduleKey}`;

  return (
    <DashboardLayout title={config.title} subtitle={config.subtitle}>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{items.length} {config.itemLabel.toLowerCase()}{items.length === 1 ? "" : "s"}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(previewRoute)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium hover:bg-muted transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Preview on microsite
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Add {config.itemLabel}
          </button>
        </div>
      </div>

      <div className="space-y-2 rounded-2xl bg-card border p-3 sm:p-4">
        {items.length === 0 ? (
          <div className="text-center py-12 text-sm text-muted-foreground">
            <p className="mb-3">No {config.itemLabel.toLowerCase()}s added yet.</p>
            <button onClick={handleAdd} className="text-primary text-xs font-medium hover:underline">
              + Add your first {config.itemLabel.toLowerCase()}
            </button>
          </div>
        ) : (
          items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              config={config}
              isEditing={editingId === item.id}
              onToggleEdit={() => editingId === item.id ? handleSave() : setEditingId(item.id)}
              onUpdate={(patch) => updateItem(config.contentType, item.id, patch)}
              onDelete={() => { deleteItem(config.contentType, item.id); if (editingId === item.id) setEditingId(null); }}
            />
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default ModuleManagerPage;
