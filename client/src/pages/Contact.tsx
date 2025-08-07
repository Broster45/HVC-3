import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Thank you!",
        description: data.message,
      });
      // Invalidate contact submissions cache if it exists
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Something went wrong. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="pt-20">
      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-6">
                  Request Your Free Quote
                </h3>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
                    <h4 className="text-xl font-semibold text-brand-charcoal mb-2">
                      Thank you for your submission!
                    </h4>
                    <p className="text-brand-grey">
                      We'll contact you within 24 hours to schedule your free consultation.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="mt-4"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="Enter your email address" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
                                placeholder="Enter your phone number" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Interest</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="new-build">New Construction</SelectItem>
                                <SelectItem value="kitchen">Kitchen Renovation</SelectItem>
                                <SelectItem value="bathroom">Bathroom Renovation</SelectItem>
                                <SelectItem value="remodel">Home Remodeling</SelectItem>
                                <SelectItem value="addition">Home Addition</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Details *</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={5}
                                placeholder="Please describe your project, timeline, and any specific requirements..." 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-brand-green hover:bg-brand-green-light text-black font-bold"
                        size="lg"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? "Submitting..." : "Submit"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="text-brand-charcoal">
              <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <Phone className="text-brand-green-light mr-4 h-8 w-8" />
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-brand-grey">(760) 522-9797</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-brand-green-light mr-4 h-8 w-8" />
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-brand-grey">hvc.phil@gmail.com</p>
                  </div>
                </div>
                
                
                
                <div className="flex items-center">
                  <Clock className="text-brand-green-light mr-4 h-8 w-8" />
                  <div>
                    <h4 className="font-semibold">Business Hours</h4>
                    <p className="text-brand-grey">
                      Mon-Fri: 7:00 AM - 6:00 PM<br />
                      Sat: 8:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Benefits */}
              <Card className="bg-brand-blue/5 border-brand-blue/20">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-4">Why Choose Highland Valley?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="text-brand-green-light mr-3 h-5 w-5" />
                      Free, detailed consultations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-brand-green-light mr-3 h-5 w-5" />
                      Licensed & fully insured
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-brand-green-light mr-3 h-5 w-5" />
                      20+ years of experience
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-brand-green-light mr-3 h-5 w-5" />
                      Quality workmanship guarantee
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-brand-green-light mr-3 h-5 w-5" />
                      Transparent pricing
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Service Areas */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold brand-charcoal mb-6">
              Service Areas
            </h2>
            <p className="text-xl brand-grey max-w-3xl mx-auto">
              We proudly serve the Highland Valley area and surrounding communities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="brand-grey">San Diego County</div>
            <div className="brand-grey">Escondido</div>
            <div className="brand-grey">Ramona</div>
            <div className="brand-grey">San Marcos</div>
            <div className="brand-grey">Poway</div>
            <div className="brand-grey">Vista</div>
            <div className="brand-grey">Fallbrook</div>
            <div className="brand-grey">Rancho Bernardo</div>
          </div>

          <div className="text-center mt-12">
            <p className="brand-grey">
              Don't see your area listed? Give us a call - we may still be able to help!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
