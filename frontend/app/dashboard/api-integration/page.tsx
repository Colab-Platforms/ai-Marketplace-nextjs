'use client';

import { useEffect, useState } from 'react';
import { webhookService } from '@/services/webhook.service';
import { toolService } from '@/services/tool.service';
import { Webhook, WebhookLog, Tool } from '@/type/tool';

export default function APIIntegrationPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [logs, setLogs] = useState<Record<string, WebhookLog[]>>({});
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState<string | null>(null);
  
  const [createForm, setCreateForm] = useState({
    tool_id: '',
    webhook_url: '',
    webhook_secret: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [webhooksRes, toolsRes] = await Promise.all([
        webhookService.getAll(),
        toolService.getMyTools({ status: 'PUBLISHED' }),
      ]);
      
      const webhookData = webhooksRes.data || [];
      setWebhooks(webhookData);
      setTools(toolsRes.data?.records || toolsRes.data || []);

      // Load logs for each webhook
      for (const webhook of webhookData) {
        try {
          const logsRes = await webhookService.getLogs(webhook.tool_id);
          setLogs((prev) => ({
            ...prev,
            [webhook.id]: logsRes.data || [],
          }));
        } catch (error) {
          console.error('Failed to load logs:', error);
        }
      }
    } catch (error) {
      console.error('Failed to load webhooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await webhookService.create(createForm);
      setShowCreateModal(false);
      setCreateForm({ tool_id: '', webhook_url: '', webhook_secret: '' });
      loadData();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Failed to create webhook');
    }
  };

  const handleTest = async (webhookId: string) => {
    try {
      setTestingWebhook(webhookId);
      const response = await webhookService.test(webhookId);
      alert(
        response.data?.success
          ? 'Webhook test successful! ✅'
          : 'Webhook test failed. Check your endpoint.'
      );
      loadData();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Webhook test failed');
    } finally {
      setTestingWebhook(null);
    }
  };

  const handleToggle = async (webhookId: string, currentStatus: boolean) => {
    try {
      await webhookService.update(webhookId, { is_active: !currentStatus });
      loadData();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Failed to update webhook');
    }
  };

  const handleDelete = async (webhookId: string) => {
    if (!confirm('Are you sure you want to delete this webhook?')) return;
    try {
      await webhookService.delete(webhookId);
      loadData();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Failed to delete webhook');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-avatar-dark">API Integration</h1>
          <p className="text-sm text-avatar-slate mt-1">
            Configure webhooks to receive real-time subscription events
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-avatar-accent hover:bg-avatar-navy text-white rounded-xl text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2"
        >
          <i className="fas fa-plus text-xs" />
          Add Webhook
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-3">
        <i className="fas fa-info-circle text-blue-500 text-lg mt-0.5 shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900 mb-1">About Webhooks</h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Webhooks allow your application to receive real-time notifications when users subscribe to your tools.
            Configure a webhook URL to receive POST requests with subscription data.
          </p>
        </div>
      </div>

      {/* Webhooks List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
            <p className="text-sm text-avatar-steel">Loading webhooks...</p>
          </div>
        </div>
      ) : webhooks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-plug text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-avatar-dark mb-2">No webhooks configured</h3>
          <p className="text-sm text-avatar-slate mb-6">
            Set up your first webhook to start receiving subscription events
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-avatar-accent hover:bg-avatar-navy text-white rounded-xl text-sm font-semibold shadow-md transition-all"
          >
            <i className="fas fa-plus text-xs" />
            Configure Webhook
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {webhooks.map((webhook) => {
            const tool = tools.find((t) => t.id === webhook.tool_id);
            const webhookLogs = logs[webhook.id] || [];
            
            return (
              <div
                key={webhook.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-avatar-dark">
                        {tool?.name || 'Unknown Tool'}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          webhook.is_active
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {webhook.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-avatar-slate font-mono break-all">
                      {webhook.webhook_url}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleTest(webhook.id)}
                    disabled={testingWebhook === webhook.id}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-60 flex items-center gap-1.5"
                  >
                    {testingWebhook === webhook.id ? (
                      <>
                        <i className="fas fa-spinner fa-spin text-[10px]" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-flask text-[10px]" />
                        Test Webhook
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleToggle(webhook.id, webhook.is_active)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      webhook.is_active
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-700'
                        : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                    }`}
                  >
                    <i
                      className={`fas ${
                        webhook.is_active ? 'fa-pause' : 'fa-play'
                      } text-[10px]`}
                    />
                    {webhook.is_active ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => handleDelete(webhook.id)}
                    className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <i className="fas fa-trash text-[10px]" />
                    Delete
                  </button>
                </div>

                {/* Webhook Logs */}
                {webhookLogs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-semibold text-avatar-dark mb-3 flex items-center gap-2">
                      <i className="fas fa-history text-xs text-avatar-steel" />
                      Recent Events ({webhookLogs.length})
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {webhookLogs.slice(0, 10).map((log) => (
                        <div
                          key={log.id}
                          className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl text-xs"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                log.success ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                            />
                            <span className="font-medium text-avatar-dark">
                              {log.event_type}
                            </span>
                            {log.response_status && (
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  log.success
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-rose-100 text-rose-700'
                                }`}
                              >
                                {log.response_status}
                              </span>
                            )}
                          </div>
                          <span className="text-avatar-steel shrink-0">
                            {new Date(log.created_at).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-avatar-dark mb-4">
              Configure New Webhook
            </h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Select Tool <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={createForm.tool_id}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, tool_id: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm"
                >
                  <option value="">Choose a tool</option>
                  {tools.map((tool) => (
                    <option key={tool.id} value={tool.id}>
                      {tool.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Webhook URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={createForm.webhook_url}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, webhook_url: e.target.value })
                  }
                  placeholder="https://yourdomain.com/webhook"
                  className="w-full px-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Webhook Secret <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={createForm.webhook_secret}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, webhook_secret: e.target.value })
                  }
                  placeholder="your_secret_key_here"
                  className="w-full px-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm font-mono"
                />
                <p className="text-xs text-avatar-steel mt-1">
                  This secret will be sent in the X-Webhook-Secret header
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-avatar-dark rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-avatar-accent hover:bg-avatar-navy text-white rounded-xl text-sm font-semibold transition-all"
                >
                  Create Webhook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
