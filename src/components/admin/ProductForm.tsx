import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from './ImageUpload';

const productSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(2, 'Name is required'),
  category: z.enum(['Phones', 'Laptops', 'Tablets']),
  price: z.coerce.number().min(0),
  specs: z.string().min(5, 'Specs are required'),
  image: z.string().url('Image is required'),
  badge: z.enum(['Best Seller', 'New', 'Deal', '']).optional(),
  featured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  isLoading?: boolean;
}

export const ProductForm = ({ initialValues, onSubmit, isLoading }: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: initialValues?.id || '',
      name: initialValues?.name || '',
      category: (initialValues?.category as any) || 'Phones',
      price: initialValues?.price || 0,
      specs: initialValues?.specs || '',
      image: initialValues?.image || '',
      badge: initialValues?.badge || '',
      featured: initialValues?.featured || false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product ID (e.g. phn-01)</FormLabel>
                <FormControl>
                  <Input placeholder="phn-01" {...field} disabled={!!initialValues?.id} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Phones">Phones</SelectItem>
                    <SelectItem value="Laptops">Laptops</SelectItem>
                    <SelectItem value="Tablets">Tablets</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Prime Edge X9 Pro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (KES)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="badge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="No badge" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="Best Seller">Best Seller</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Deal">Deal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="specs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specifications</FormLabel>
              <FormControl>
                <Textarea placeholder='6.7" AMOLED · 256GB · 12GB RAM' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <ImageUpload onUpload={field.onChange} defaultValue={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Featured Product
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  This product will appear in the "Featured" section and on the home page.
                </p>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialValues ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
};
