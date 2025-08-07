import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MessageCircle, Heart, Calendar, DollarSign, Phone, Home, Bolt, Award } from "lucide-react";

export default function CoreFoundations() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold brand-charcoal mb-6">
            Our Core Foundations
          </h1>
          <p className="text-xl brand-grey max-w-3xl mx-auto">
            These values guide every decision we make and every project we complete. 
            They're not just words on a page—they're the principles that define who we are.
          </p>
        </div>
      </section>
      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trust */}
            <Card className="text-center p-8 group hover:shadow-xl transition-all duration-300">
              <div className="bg-brand-green-light/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-green-light/20 transition-colors duration-300">
                <Shield className="h-12 w-12 brand-green" />
              </div>
              <h3 className="text-2xl font-bold brand-charcoal mb-4">Trust</h3>
              <p className="brand-grey leading-relaxed">
                Trust is earned through consistent actions, honest communication, and 
                delivering on our promises. We believe in building relationships that 
                last beyond the completion of your project. Every interaction is an 
                opportunity to strengthen the trust you place in us.
              </p>
            </Card>

            {/* Communication */}
            <Card className="text-center p-8 group hover:shadow-xl transition-all duration-300">
              <div className="bg-brand-blue-light/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-blue-light/20 transition-colors duration-300">
                <MessageCircle className="h-12 w-12 brand-blue-light" />
              </div>
              <h3 className="text-2xl font-bold brand-charcoal mb-4">Communication</h3>
              <p className="brand-grey leading-relaxed">
                Clear, timely, and transparent communication eliminates surprises and 
                builds confidence. We keep you informed at every step, listen to your 
                concerns, and ensure you always know what's happening with your project. 
                Your input shapes the outcome.
              </p>
            </Card>

            {/* Customer Care */}
            <Card className="text-center p-8 group hover:shadow-xl transition-all duration-300">
              <div className="bg-brand-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-green/20 transition-colors duration-300">
                <Heart className="h-12 w-12 brand-green" />
              </div>
              <h3 className="text-2xl font-bold brand-charcoal mb-4">Customer Care</h3>
              <p className="brand-grey leading-relaxed">
                Your satisfaction is our success. We go above and beyond to ensure 
                your experience with us is positive from start to finish. We treat 
                your home with the same care and respect we would our own, because 
                great craftsmanship means nothing without great service.
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* Values in Action */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12">
            <h3 className="text-3xl font-bold brand-charcoal mb-8 text-center">
              Our Values in Action
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Calendar className="text-brand-green mr-4 h-6 w-6 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-2">Weekly Progress Updates</h4>
                    <p className="text-brand-grey">
                      Regular updates with photos and detailed progress reports keep 
                      you informed every step of the way.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="text-brand-green mr-4 h-6 w-6 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-2">Transparent Pricing</h4>
                    <p className="text-brand-grey">
                      Detailed estimates with no hidden fees or surprise charges. 
                      You'll know exactly what you're paying for.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-brand-green mr-4 h-6 w-6 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-2">Direct Access</h4>
                    <p className="text-brand-grey">
                      Direct communication with project managers and easy access to 
                      address any questions or concerns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Home className="text-brand-green mr-4 h-6 w-6 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-2">Respect for Your Home</h4>
                    <p className="text-brand-grey">
                      We treat your property with care, maintaining clean work areas 
                      and protecting your belongings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Bolt className="text-brand-green mr-4 h-6 w-6 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-2">Quality Workmanship</h4>
                    <p className="text-brand-grey">
                      Skilled craftsmen using premium materials and proven techniques 
                      to deliver lasting results.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="text-brand-green mr-4 h-6 w-6 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-2">Service Guarantee</h4>
                    <p className="text-brand-grey">We stand behind our work with warranties and ongoing support.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      {/* The Highland Valley Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-charcoal mb-6">The HVC Promise</h2>
            <p className="text-xl text-brand-grey max-w-4xl mx-auto">
              When you choose Highland Valley Construction, you're not just hiring a 
              contractor—you're partnering with a team that cares about your vision 
              as much as you do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 brand-green" />
              </div>
              <h3 className="text-lg font-semibold brand-charcoal mb-2">On-Schedule Completion</h3>
              <p className="brand-grey text-sm">
                We respect your time and complete projects when promised
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 brand-green" />
              </div>
              <h3 className="text-lg font-semibold brand-charcoal mb-2">Budget Conscious</h3>
              <p className="brand-grey text-sm">
                No surprises, no hidden costs, just honest pricing
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 brand-green" />
              </div>
              <h3 className="text-lg font-semibold brand-charcoal mb-2">Quality Assured</h3>
              <p className="brand-grey text-sm">
                Every detail matters, every standard exceeded
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 brand-green" />
              </div>
              <h3 className="text-lg font-semibold brand-charcoal mb-2">Care & Respect</h3>
              <p className="brand-grey text-sm">
                Your home is treated with the utmost care and respect
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
