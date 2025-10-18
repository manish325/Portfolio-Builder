import { Component, OnInit } from '@angular/core';
import { ILayout, IUserData } from '../../types';
import { layouts } from '../../data';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';

interface EnhancedLayout extends ILayout {
  description: string;
  rating: number;
  tags: string[];
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  selectedLayout: ILayout = layouts[0];
  user !: IUserData;
  showPortfolioModal: boolean = false;

  // Enhanced layout data with AI integration feel
  enhancedLayoutData: EnhancedLayout[] = [
    {
      path: '/modern-professional',
      title: 'Modern Professional',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&crop=center',
      description: 'Stunning professional template with dark gradients, animated backgrounds, and modern glass morphism effects.',
      rating: 4.9,
      tags: ['Professional', 'Modern', 'Corporate']
    },
    {
      path: '/creative-portfolio',
      title: 'Creative Portfolio',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop&crop=center',
      description: 'Vibrant creative template with artistic animations, showcase galleries, and bold color schemes.',
      rating: 4.8,
      tags: ['Creative', 'Artistic', 'Vibrant']
    },
    {
      path: '/sample-portfolio',
      title: 'Complete Professional Portfolio',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&crop=center',
      description: 'Comprehensive portfolio showcasing all professional data - skills, experience, education, projects, achievements, and more.',
      rating: 4.9,
      tags: ['Complete', 'Professional', 'Comprehensive', 'Sample'],
    },
    {
      path: '/tech-innovator',
      title: 'Tech Innovator',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop&crop=center',
      description: 'Futuristic cyberpunk design with neon effects, terminal interfaces, and cutting-edge animations for tech professionals.',
      rating: 4.8,
      tags: ['Tech', 'Cyberpunk', 'Futuristic', 'Neon']
    },
    {
      path: '/executive-suite',
      title: 'Executive Suite',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&crop=center',
      description: 'Luxury gold and black theme with sophisticated design elements perfect for C-level executives and business leaders.',
      rating: 4.7,
      tags: ['Executive', 'Luxury', 'Gold', 'Sophisticated']
    },
    {
      path: '/minimalist-clean',
      title: 'Minimalist Clean',
      image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=200&fit=crop&crop=center',
      description: 'Ultra-clean white theme with perfect typography and minimal design focusing on content and simplicity.',
      rating: 4.6,
      tags: ['Minimal', 'Clean', 'White', 'Typography']
    },
    {
      path: '/startup-dynamic',
      title: 'Startup Dynamic',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop&crop=center',
      description: 'Energetic design with bold colors, dynamic animations, and startup vibes perfect for entrepreneurs and founders.',
      rating: 4.5,
      tags: ['Startup', 'Dynamic', 'Energetic', 'Bold']
    }
  ];

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getUser().subscribe({
      next: (user: IUserData) => {
        this.user = user;
        console.log("Logging the getted user : ", user);
      }
    });
  }

  selectLayout(layout: ILayout) {
    this.selectedLayout = layout;
    const navigationUrl = `/dashboard/${layout.path}`;
    this.router.navigate([navigationUrl]);
  }

  previewTemplate(layout: ILayout, event: Event) {
    event.stopPropagation();
    this.selectedLayout = layout;
    this.showPortfolioModal = true;
    const navigationUrl = `/dashboard/${layout.path}`;
    this.router.navigate([navigationUrl]);
  }

  closePortfolioModal() {
    this.showPortfolioModal = false;
  }

  openAIGenerator() {
    // AI generator functionality will be implemented
    console.log('Opening AI Generator...');
  }

  openProfileForm() {
    this.router.navigate(['/dashboard/profile']);
  }

  getProfilePicture() {
    return this.user?.profilePicture;
  }

  getStarted() {
    this.router.navigate(['/dashboard/profile']);
  }

  logout() {
    this.dashboardService.logout();
  }

  // Legacy property for backward compatibility
  layoutData: ILayout[] = layouts;
}