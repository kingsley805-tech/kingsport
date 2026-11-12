import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import PORTFOLIO_CONFIG from "@/config";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";

// Enable React 18 act environment
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// Mock IntersectionObserver & ResizeObserver in jsdom
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockObserver,
});
Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockObserver,
});

// Mock canvas context for HeroScene
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  clearRect: vi.fn(),
  setTransform: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
})) as any;

describe("Portfolio CV Data & Core Components", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.restoreAllMocks();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("contains accurate CV identity, experience, education, and certifications", () => {
    expect(PORTFOLIO_CONFIG.name).toBe("Kingsley Atta Yeboah");
    expect(PORTFOLIO_CONFIG.email).toBe("kingsleyyeboah805@gmail.com");
    expect(PORTFOLIO_CONFIG.phone).toBe("+233 503688781");
    expect(PORTFOLIO_CONFIG.experience).toHaveLength(5);
    expect(PORTFOLIO_CONFIG.education[0].institution).toBe("University Of The People");
    expect(PORTFOLIO_CONFIG.certifications).toHaveLength(7);
    expect(PORTFOLIO_CONFIG.socials.resume).toBe("/Kingsley_Atta_Yeboah_CV.pdf");
  });

  it("renders HeroSection with CV download link and primary CTAs", async () => {
    await act(async () => {
      root.render(
        <MotionConfig reducedMotion="user">
          <HeroSection
            latestRepo={null}
            repoCount={37}
            onExploreProjects={vi.fn()}
            onContactClick={vi.fn()}
            onOpenCVPreview={vi.fn()}
          />
        </MotionConfig>
      );
    });

    expect(container.textContent).toContain("Kingsley Atta Yeboah");
    expect(container.textContent).toContain("View My Projects");

    const cvLink = container.querySelector('a[download="Kingsley_Atta_Yeboah_CV.pdf"]');
    expect(cvLink).not.toBeNull();
    expect(cvLink?.getAttribute("href")).toBe("/Kingsley_Atta_Yeboah_CV.pdf");
  });

  it("preserves ProjectsSection search, filters, and featured case studies", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [
        {
          id: 1,
          name: "edumanageschools",
          full_name: "kingsley805-tech/edumanageschools",
          description: "Multi-tenant school ERP",
          html_url: "https://github.com/kingsley805-tech/edumanageschools",
          homepage: "https://edumanagement-eight.vercel.app",
          stargazers_count: 3,
          forks_count: 1,
          watchers_count: 1,
          language: "TypeScript",
          topics: ["react", "nodejs"],
          fork: false,
          archived: false,
          pushed_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          size: 512,
        },
      ],
    }) as any;

    await act(async () => {
      root.render(
        <MemoryRouter>
          <MotionConfig reducedMotion="user">
            <ProjectsSection />
          </MotionConfig>
        </MemoryRouter>
      );
    });

    // Wait for async GitHub fetch effect
    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });

    expect(container.textContent).toContain("EduManage — Multi-Tenant School Management ERP");
    expect(container.textContent).toContain("Ghana STC Parcel System");
    expect(container.textContent).toContain("All Software (1)");

    const searchInput = container.querySelector(
      'input[aria-label="Search repositories"]'
    ) as HTMLInputElement;
    expect(searchInput).not.toBeNull();

    // Update search query to verify filtering
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(searchInput, "nonexistent-xyz");
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    });

    expect(container.textContent).toContain(
      "No repositories match your active filter criteria."
    );
  });

  it("validates ContactSection form fields before preparing email inquiry", async () => {
    await act(async () => {
      root.render(<ContactSection />);
    });

    const form = container.querySelector("form");
    expect(form).not.toBeNull();

    await act(async () => {
      form?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(container.textContent).toContain("Please enter your full name");
    expect(container.textContent).toContain("Please enter a valid email address");
  });

  it("renders EducationSection with UoPeople degree and all certifications", async () => {
    await act(async () => {
      root.render(
        <MotionConfig reducedMotion="user">
          <EducationSection />
        </MotionConfig>
      );
    });

    expect(container.textContent).toContain("Bachelor's Degree in Computer Science");
    expect(container.textContent).toContain("University Of The People");
    expect(container.textContent).toContain("Google IT Support Certification");
  });
});
