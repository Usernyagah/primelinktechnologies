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
import { ImageUpload } from './ImageUpload';

const serviceSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description is too short'),
  icon: z.string().min(1, 'Icon name is required (e.g. Code, Database)'),
  image: z.string().url('Image is required'),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  initialValues?: Partial<ServiceFormValues>;
  onSubmit: (values: ServiceFormValues) => void;
  isLoading?: boolean;
}

export const ServiceForm = ({ initialValues, onSubmit, isLoading }: ServiceFormProps) => {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      id: initialValues?.id,
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      icon: initialValues?.icon || 'Code',
      image: initialValues?.image || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Title</FormLabel>
              <FormControl>
                <Input placeholder="E-commerce Platforms" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon Name (Lucide React)</FormLabel>
              <FormControl>
                <Input placeholder="ShoppingBag" {...field} />
              </FormControl>
              <p className="text-xs text-muted-foreground">Common: Code, ShoppingBag, LineChart, Building, Network</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the service..." {...field} />
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
              <FormLabel>Feature Image</FormLabel>
              <FormControl>
                <ImageUpload onUpload={field.onChange} defaultValue={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialValues ? 'Update Service' : 'Add Service'}
        </Button>
      </form>
    </Form>
  );
};
