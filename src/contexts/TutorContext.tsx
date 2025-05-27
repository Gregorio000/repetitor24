import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tutors } from '../data/tutors';

export interface Tutor {
  id: string;
  name: string;
  photo: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  reviews: number;
  location: string;
  availability: string[];
  bio: string;
  education: string[];
  experience: string;
  languages: string[];
  featured?: boolean;
}

export interface Booking {
  id: string;
  tutorId: string;
  studentId: string;
  date: string;
  startTime: string;
  endTime: string;
  subject: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

interface TutorFilters {
  subject?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  location?: string;
  search?: string;
}

interface TutorContextType {
  tutors: Tutor[];
  featuredTutors: Tutor[];
  getTutorById: (id: string) => Tutor | undefined;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  updatePaymentStatus: (id: string, status: Booking['paymentStatus']) => void;
  filterTutors: (filters: TutorFilters) => Tutor[];
}

const TutorContext = createContext<TutorContextType | undefined>(undefined);

export const useTutors = () => {
  const context = useContext(TutorContext);
  if (!context) {
    throw new Error('useTutors must be used within a TutorProvider');
  }
  return context;
};

export const TutorProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error('Failed to load bookings from localStorage', error);
    }
  }, []);

  const getTutorById = (id: string) => tutors.find(tutor => tutor.id === id);

  const featuredTutors = tutors.filter(tutor => tutor.featured);

  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    try {
      localStorage.setItem('bookings', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save bookings to localStorage', error);
    }
  };

  const generateId = () => crypto.randomUUID?.() || Math.random().toString(36).substring(2, 11);

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...booking,
      id: generateId(),
    };
    saveBookings([...bookings, newBooking]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    );
    saveBookings(updated);
  };

  const updatePaymentStatus = (id: string, status: Booking['paymentStatus']) => {
    const updated = bookings.map(booking =>
      booking.id === id ? { ...booking, paymentStatus: status } : booking
    );
    saveBookings(updated);
  };

  const filterTutors = (filters: TutorFilters): Tutor[] => {
    return tutors.filter(tutor => {
      if (filters.subject && filters.subject !== 'all' && !tutor.subjects.includes(filters.subject)) return false;
      if (filters.minPrice !== undefined && tutor.hourlyRate < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && tutor.hourlyRate > filters.maxPrice) return false;
      if (filters.rating !== undefined && tutor.rating < filters.rating) return false;
      if (filters.location && filters.location !== 'all' && tutor.location !== filters.location) return false;

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const inName = tutor.name.toLowerCase().includes(searchLower);
        const inSubjects = tutor.subjects.some(subject => subject.toLowerCase().includes(searchLower));
        const inBio = tutor.bio.toLowerCase().includes(searchLower);
        if (!inName && !inSubjects && !inBio) return false;
      }

      return true;
    });
  };

  const value: TutorContextType = {
    tutors,
    featuredTutors,
    getTutorById,
    bookings,
    addBooking,
    updateBookingStatus,
    updatePaymentStatus,
    filterTutors,
  };

  return <TutorContext.Provider value={value}>{children}</TutorContext.Provider>;
};
