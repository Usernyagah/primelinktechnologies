import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/lib/db';
import { getProductPrimaryImage } from '@/lib/product-utils';
import { Button } from '@/components/ui/button';
import { Plus, Package, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductForm } from '@/components/admin/ProductForm';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.list(),
  });

  const createProduct = useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created');
      setIsDialogOpen(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateProduct = useMutation({
    mutationFn: productsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated');
      setEditingItem(null);
      setIsDialogOpen(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteProduct = useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  return (
    <main className="container-px py-10">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/40 border border-border rounded-md text-sm font-medium">
            <Package className="w-4 h-4" />
            Products Management
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90" onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit' : 'Add New'} Product</DialogTitle>
              </DialogHeader>
              <ProductForm
                initialValues={editingItem}
                onSubmit={(values) =>
                  editingItem ? updateProduct.mutate(values) : createProduct.mutate(values)
                }
                isLoading={createProduct.isPending || updateProduct.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-xl border border-border overflow-hidden bg-surface">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loadingProducts ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                    Loading products...
                  </td>
                </tr>
              ) : products?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                    No products found.
                  </td>
                </tr>
              ) : (
                products?.map((p: any) => (
                  <tr key={p.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={getProductPrimaryImage(p)}
                          className="w-10 h-10 rounded object-cover"
                          alt=""
                        />
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{p.category}</td>
                    <td className="px-6 py-4">KES {p.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => deleteProduct.mutate(p.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
