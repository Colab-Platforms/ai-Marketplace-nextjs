'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toolService } from '@/services/tool.service';
import { Tool } from '@/type/tool';

export default function ProductsPage() {
  const router = useRouter();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'DRAFT' | 'PUBLISHED'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadTools = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await toolService.getMyTools(params);
      setTools(response.data?.data || response.data?.records || []);
    } catch (error) {
      console.error('Failed to load tools:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTools();
  }, [filter]);

  const handlePublish = async (id: string) => {
    try {
      await toolService.publishTool(id);
      loadTools();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Failed to publish tool');
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      await toolService.unpublishTool(id);
      loadTools();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Failed to unpublish tool');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await toolService.deleteTool(id);
      setDeleteConfirm(null);
      loadTools();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Failed to delete tool');
    }
  };

  const filteredTools = tools;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-avatar-dark">AI Tool Listings</h1>
          <p className="text-sm text-avatar-slate mt-1">
            Manage your AI products and marketplace listings
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="px-5 py-2.5 bg-avatar-accent hover:bg-avatar-navy text-white rounded-xl text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2"
        >
          <i className="fas fa-plus text-xs" />
          Add New Tool
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 bg-white rounded-2xl p-2 border border-slate-200 w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filter === 'all'
              ? 'bg-avatar-accent text-white shadow-sm'
              : 'text-avatar-slate hover:text-avatar-dark hover:bg-slate-50'
          }`}
        >
          All Tools
        </button>
        <button
          onClick={() => setFilter('PUBLISHED')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filter === 'PUBLISHED'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-avatar-slate hover:text-avatar-dark hover:bg-slate-50'
          }`}
        >
          Published
        </button>
        <button
          onClick={() => setFilter('DRAFT')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filter === 'DRAFT'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-avatar-slate hover:text-avatar-dark hover:bg-slate-50'
          }`}
        >
          Drafts
        </button>
      </div>

      {/* Tools Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
            <p className="text-sm text-avatar-steel">Loading tools...</p>
          </div>
        </div>
      ) : filteredTools.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-avatar-accent/10 text-avatar-accent flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-robot text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-avatar-dark mb-2">No tools found</h3>
          <p className="text-sm text-avatar-slate mb-6">
            {filter === 'all'
              ? 'Start by adding your first AI tool to the marketplace'
              : `You don't have any ${filter.toLowerCase()} tools yet`}
          </p>
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-avatar-accent hover:bg-avatar-navy text-white rounded-xl text-sm font-semibold shadow-md transition-all"
          >
            <i className="fas fa-plus text-xs" />
            Add Your First Tool
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Tool Image */}
              <div className="relative h-48 bg-gradient-to-br from-avatar-accent/10 to-avatar-navy/10">
                {tool.logo_url ? (
                  <img
                    src={tool.logo_url}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-robot text-4xl text-avatar-steel/30" />
                  </div>
                )}
                {/* Status Badge */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    tool.status === 'PUBLISHED'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {tool.status}
                </span>
              </div>

              {/* Tool Info */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-avatar-dark line-clamp-1">
                    {tool.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                      tool.pricing_model === 'FREE'
                        ? 'bg-emerald-100 text-emerald-700'
                        : tool.pricing_model === 'FREEMIUM'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {tool.pricing_model}
                  </span>
                </div>
                <p className="text-xs text-avatar-slate line-clamp-2 mb-4 flex-1">
                  {tool.short_description || 'No description available'}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/products/${tool.id}/edit`}
                    className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-avatar-dark rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <i className="fas fa-edit text-[10px]" />
                    Edit
                  </Link>
                  {tool.status === 'DRAFT' ? (
                    <button
                      onClick={() => handlePublish(tool.id)}
                      className="flex-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <i className="fas fa-rocket text-[10px]" />
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnpublish(tool.id)}
                      className="flex-1 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <i className="fas fa-eye-slash text-[10px]" />
                      Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteConfirm(tool.id)}
                    className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-xl text-xs font-semibold transition-all"
                  >
                    <i className="fas fa-trash text-[10px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-triangle text-lg" />
            </div>
            <h3 className="text-lg font-bold text-center text-avatar-dark mb-2">
              Delete Tool?
            </h3>
            <p className="text-sm text-center text-avatar-slate mb-6">
              This action cannot be undone. The tool will be permanently removed from your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-avatar-dark rounded-xl text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-semibold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
