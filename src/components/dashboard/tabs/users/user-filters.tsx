import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFiltersProps {
  searchInput: string;
  roleFilter: string;
  bannedFilter: string;
  onSearchInputChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onBannedFilterChange: (value: string) => void;
  onSearch: () => void;
}

export function UserFilters({
  searchInput,
  roleFilter,
  bannedFilter,
  onSearchInputChange,
  onRoleFilterChange,
  onBannedFilterChange,
  onSearch,
}: UserFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <div className="flex flex-1 gap-2">
        <Input
          placeholder="Search by name, email, or ID..."
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          className="max-w-sm"
        />
        <Button onClick={onSearch} size="icon" variant="secondary">
          <Search className="size-4" />
        </Button>
      </div>
      <Select value={roleFilter} onValueChange={onRoleFilterChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
      <Select value={bannedFilter} onValueChange={onBannedFilterChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="false">Active</SelectItem>
          <SelectItem value="true">Banned</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
