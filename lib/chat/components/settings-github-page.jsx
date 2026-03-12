'use client';

import { useState, useEffect } from 'react';
import { CheckIcon } from './icons.js';
import {
  getGitHubConfig,
  updateGitHubSecret,
  updateGitHubVariable,
} from '../actions.js';

// ─────────────────────────────────────────────────────────────────────────────
// Shared row components
// ─────────────────────────────────────────────────────────────────────────────

function SecretRow({ name, label, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!value) return;
    setSaving(true);
    setError(null);
    const result = await onUpdate(name, value);
    setSaving(false);
    if (result?.success) {
      setEditing(false);
      setValue('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setError(result?.error || 'Failed to set secret');
    }
  };

  if (editing) {
    return (
      <div className="flex flex-col gap-2 py-3">
        <div>
          <div className="text-sm font-medium">{label}</div>
          <div className="text-xs text-muted-foreground font-mono">{name}</div>
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <div className="flex items-center gap-2">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value..."
            autoFocus
            className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <button onClick={handleSave} disabled={!value || saving}
            className="rounded-md px-2.5 py-1.5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={() => { setEditing(false); setValue(''); setError(null); }}
            className="rounded-md px-2.5 py-1.5 text-xs font-medium border border-border text-muted-foreground hover:text-foreground">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground font-mono">{name}</div>
      </div>
      <button onClick={() => setEditing(true)}
        className={`rounded-md px-2.5 py-1.5 text-xs font-medium border shrink-0 self-start sm:self-auto ${
          saved ? 'border-green-500 text-green-600' : 'border-border text-muted-foreground hover:bg-accent hover:text-foreground'
        }`}>
        {saved ? <span className="inline-flex items-center gap-1"><CheckIcon size={12} /> Saved</span> : 'Set'}
      </button>
    </div>
  );
}

function VariableRow({ name, label, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const result = await onUpdate(name, value);
    setSaving(false);
    if (result?.success) {
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setError(result?.error || 'Failed to set variable');
    }
  };

  if (editing) {
    return (
      <div className="flex flex-col gap-2 py-3">
        <div>
          <div className="text-sm font-medium">{label}</div>
          <div className="text-xs text-muted-foreground font-mono">{name}</div>
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <div className="flex items-center gap-2">
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value..." autoFocus
            className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-foreground"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()} />
          <button onClick={handleSave} disabled={saving}
            className="rounded-md px-2.5 py-1.5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={() => { setEditing(false); setValue(''); setError(null); }}
            className="rounded-md px-2.5 py-1.5 text-xs font-medium border border-border text-muted-foreground hover:text-foreground">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground font-mono">{name}</div>
      </div>
      <button onClick={() => setEditing(true)}
        className={`rounded-md px-2.5 py-1.5 text-xs font-medium border shrink-0 self-start sm:self-auto ${
          saved ? 'border-green-500 text-green-600' : 'border-border text-muted-foreground hover:bg-accent hover:text-foreground'
        }`}>
        {saved ? <span className="inline-flex items-center gap-1"><CheckIcon size={12} /> Saved</span> : 'Set'}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared hook for loading GitHub config
// ─────────────────────────────────────────────────────────────────────────────

function useGitHubConfig() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await getGitHubConfig();
        setData(result);
      } catch {
        setData({ error: 'Failed to load GitHub configuration' });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading };
}

function NotConfigured() {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center">
      <h3 className="text-sm font-medium mb-2">GitHub not configured</h3>
      <p className="text-xs text-muted-foreground">
        Set a GitHub token on the API Keys tab to enable job secret management.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Secrets sub-tab
// ─────────────────────────────────────────────────────────────────────────────

export function GitHubSecretsPage() {
  const { data, loading } = useGitHubConfig();

  if (loading) {
    return <div className="h-48 animate-pulse rounded-md bg-border/50" />;
  }

  if (data?.error) return <NotConfigured />;

  const handleUpdate = async (name, value) => {
    return await updateGitHubSecret(name, value);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-medium">Secrets</h2>
        <p className="text-sm text-muted-foreground">Encrypted values stored on GitHub for agent jobs. Values cannot be read back after setting.</p>
      </div>
      <div className="rounded-lg border bg-card p-4">
        <div className="divide-y divide-border">
          {data.secrets.map((s) => (
            <SecretRow key={s.name} name={s.name} label={s.label} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variables sub-tab
// ─────────────────────────────────────────────────────────────────────────────

export function GitHubVariablesPage() {
  const { data, loading } = useGitHubConfig();

  if (loading) {
    return <div className="h-48 animate-pulse rounded-md bg-border/50" />;
  }

  if (data?.error) return <NotConfigured />;

  const handleUpdate = async (name, value) => {
    return await updateGitHubVariable(name, value);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-medium">Variables</h2>
        <p className="text-sm text-muted-foreground">Configuration values for agent jobs.</p>
      </div>
      <div className="rounded-lg border bg-card p-4">
        <div className="divide-y divide-border">
          {data.variables.map((v) => (
            <VariableRow key={v.name} name={v.name} label={v.label} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Backwards compat
export function SettingsGitHubPage() {
  return <GitHubSecretsPage />;
}
