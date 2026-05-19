import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ExternalLink, LogOut, Mail, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
    isActive
      ? 'bg-accent text-accent-foreground'
      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
  );

export const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container-px h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link to="/" className="text-muted-foreground hover:text-foreground shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold tracking-tight truncate">Prime Link Admin</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/" target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout} className="text-destructive hover:bg-destructive/10">
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
        <nav className="container-px pb-3 flex gap-2">
          <NavLink to="/admin" end className={navLinkClass}>
            <Package className="w-4 h-4" />
            Products
          </NavLink>
          <NavLink to="/admin/messages" className={navLinkClass}>
            <Mail className="w-4 h-4" />
            Contact messages
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
