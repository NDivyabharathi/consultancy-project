import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  TrendingUp,
  Package,
  BarChart3,
  Calculator,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Demand Forecasting",
    description: "ARIMA & LSTM models predict future demand with 87%+ accuracy",
  },
  {
    icon: Calculator,
    title: "Smart Pricing",
    description: "ML-optimized pricing based on market conditions and costs",
  },
  {
    icon: Package,
    title: "Inventory Optimization",
    description: "Predict stock depletion and automate reorder alerts",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description: "Real-time dashboards with seasonal trend analysis",
  },
  {
    icon: Shield,
    title: "Waste Reduction",
    description: "Data-driven insights to minimize overproduction",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Live inventory tracking and instant order notifications",
  },
];

const stats = [
  { value: "50%", label: "Waste Reduction" },
  { value: "28%", label: "Sales Increase" },
  { value: "87%", label: "Forecast Accuracy" },
  { value: "3x", label: "Faster Decisions" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Layers className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold">IntelliTextile</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Zap className="h-3 w-3 mr-1" />
            Powered by Machine Learning
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 animate-fade-in">
            Smart Textile Industry
            <br />
            <span className="text-gradient">Management & Analytics</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up">
            Transform your textile business with AI-powered demand forecasting,
            intelligent pricing, and real-time inventory optimization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link to="/auth">
              <Button size="lg" className="gap-2 text-lg px-8">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools powered by machine learning to optimize every aspect
              of your textile business operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join hundreds of textile manufacturers using IntelliTextile to make
            data-driven decisions and increase profitability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-lg px-8"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-primary-foreground/80 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              14-day free trial
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary">
                <Layers className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">IntelliTextile</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 IntelliTextile. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
