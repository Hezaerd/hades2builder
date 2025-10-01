import { create } from "zustand";

export interface DashboardState {
  selectedBuildId: string | null;
  selectedTemplateId: string | null;
  filters: {
    buildType: string | null;
    templateCategory: string | null;
  };
  setSelectedBuildId: (id: string | null) => void;
  setSelectedTemplateId: (id: string | null) => void;
  setFilters: (filters: Partial<DashboardState["filters"]>) => void;
  resetFilters: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedBuildId: null,
  selectedTemplateId: null,
  filters: {
    buildType: null,
    templateCategory: null,
  },
  setSelectedBuildId: (id) => set({ selectedBuildId: id }),
  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () =>
    set({
      filters: {
        buildType: null,
        templateCategory: null,
      },
    }),
}));
