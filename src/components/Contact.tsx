import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ContactFormData {
  name: string;
  age: string;
  city: string;
  height: string;
  weight: string;
  goalWeight: string;
  profession: string;
  healthIssues: string;
  email: string;
  phone: string;
}

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const message = `
New Contact Form Submission:
📝 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
🎂 Age: ${data.age}
🏠 City: ${data.city}
⬆ Height: ${data.height}
⚖ Weight: ${data.weight}
🔥 Goal Weight: ${data.goalWeight}
💼 Work/Profession: ${data.profession}
🏥 Health issues/Fitness Goals: ${data.healthIssues}
      `.trim();

      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = '919876543210';
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      toast.success('Form submitted successfully! Redirecting to WhatsApp...');
      reset();
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    }
  };

  return (
    <section className="py-20 bg-background" id="contact">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Get in Touch</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Have questions? We're here to help you on your wellness journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <Card className="text-center border-primary/20">
              <CardContent className="p-6 flex flex-col items-center gap-2">
                <Phone className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20">
              <CardContent className="p-6 flex flex-col items-center gap-2">
                <Mail className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground break-all">contact@healthybusiness.com</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20">
              <CardContent className="p-6 flex flex-col items-center gap-2">
                <MapPin className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Location</h3>
                <p className="text-muted-foreground">123 Wellness Street, Health City</p>
              </CardContent>
            </Card>
          </div>
          <Card className="border-primary/20">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" {...register('name', { required: 'Name is required' })} />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input id="age" type="number" {...register('age', { required: 'Age is required' })} />
                  {errors.age && <p className="text-destructive text-sm mt-1">{errors.age.message}</p>}
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" {...register('city', { required: 'City is required' })} />
                  {errors.city && <p className="text-destructive text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input id="height" type="number" {...register('height', { required: 'Height is required' })} />
                  {errors.height && <p className="text-destructive text-sm mt-1">{errors.height.message}</p>}
                </div>
                <div>
                  <Label htmlFor="weight">Current Weight (kg) *</Label>
                  <Input id="weight" type="number" {...register('weight', { required: 'Weight is required' })} />
                  {errors.weight && <p className="text-destructive text-sm mt-1">{errors.weight.message}</p>}
                </div>
                <div>
                  <Label htmlFor="goalWeight">Goal Weight (kg) *</Label>
                  <Input id="goalWeight" type="number" {...register('goalWeight', { required: 'Goal weight is required' })} />
                  {errors.goalWeight && <p className="text-destructive text-sm mt-1">{errors.goalWeight.message}</p>}
                </div>
                <div>
                  <Label htmlFor="profession">Work/Profession *</Label>
                  <Input id="profession" {...register('profession', { required: 'Profession is required' })} />
                  {errors.profession && <p className="text-destructive text-sm mt-1">{errors.profession.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number',
                      },
                    })}
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="healthIssues">Health Issues/Fitness Goals *</Label>
                  <Textarea id="healthIssues" rows={4} {...register('healthIssues', { required: 'This field is required' })} />
                  {errors.healthIssues && <p className="text-destructive text-sm mt-1">{errors.healthIssues.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full">Send Message</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
