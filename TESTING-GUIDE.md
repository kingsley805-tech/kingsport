# Dashboard Testing Guide

## Server
🌐 **http://localhost:8083**

---

## ✅ CRUD Operations Testing Checklist

### **Projects Tab**

#### 1. CREATE - Add New Project ✓
**Steps:**
1. Click "Add Project" button
2. Fill in all required fields:
   - Title: "Test Project"
   - Description: "This is a test project"
   - Live URL: https://example.com
   - GitHub URL: https://github.com/test/repo
   - Tech Stack: Add at least one (e.g., React, TypeScript)
   - Thumbnail URL: (optional) https://via.placeholder.com/400
3. Click "Create Project"

**Expected:**
- ✅ Success toast: "Project created successfully!"
- ✅ Modal closes automatically
- ✅ New project appears in the table
- ✅ Console shows steps 1-10 with "SUCCESS!"

---

#### 2. READ - View Projects ✓
**Steps:**
1. Navigate to Dashboard
2. Check the Projects tab

**Expected:**
- ✅ All projects load and display
- ✅ Project details visible (title, description, URLs, tech stack)
- ✅ Stats cards show correct counts
- ✅ No loading errors

---

#### 3. UPDATE - Edit Project ✓
**Steps:**
1. Click the edit icon (pencil) on any project
2. Modify one or more fields (e.g., change title to "Updated Project")
3. Click "Update Project"

**Expected:**
- ✅ Success toast: "Project updated successfully!"
- ✅ Modal closes automatically
- ✅ Changes reflected immediately in table
- ✅ Console shows UPDATE steps with "SUCCESS!"

---

#### 4. DELETE - Remove Project ✓
**Steps:**
1. Click the delete icon (trash) on any project
2. Confirm deletion in the modal
3. Click "Delete"

**Expected:**
- ✅ Success toast: "Project deleted successfully!"
- ✅ Modal closes automatically
- ✅ Project removed from table
- ✅ Stats update accordingly
- ✅ Console shows DELETE steps with "SUCCESS!"

---

### **About Me Tab**

#### 5. UPDATE Bio ✓
**Steps:**
1. Click "About Me" tab
2. Edit "Mini Bio" field
3. Edit "Full Bio" field
4. Click "Save Bio"

**Expected:**
- ✅ Success toast: "About section updated!"
- ✅ Changes saved
- ✅ Console shows ABOUT UPDATE steps with "SUCCESS!"

---

#### 6. UPDATE Skills ✓
**Steps:**
1. In About Me tab, scroll to Skills section
2. Add a frontend skill (e.g., "Vue.js")
3. Add a backend skill (e.g., "Django")
4. Remove a skill by clicking X
5. Click "Save Skills"

**Expected:**
- ✅ Success toast: "About section updated!"
- ✅ Skills saved correctly
- ✅ Console shows ABOUT UPDATE steps with "SUCCESS!"

---

#### 7. UPDATE Hobbies ✓
**Steps:**
1. In About Me tab, scroll to Hobbies section
2. Add an emoji (e.g., 🎮)
3. Add a label (e.g., "Gaming")
4. Click Add
5. Remove a hobby by clicking X
6. Click "Save Hobbies"

**Expected:**
- ✅ Success toast: "About section updated!"
- ✅ Hobbies saved correctly
- ✅ Console shows ABOUT UPDATE steps with "SUCCESS!"

---

## 🐛 Error Handling Tests

### Test 1: Form Validation
**Steps:**
1. Click "Add Project"
2. Leave Title empty
3. Click "Create Project"

**Expected:**
- ❌ Error toast: "Title is required"
- ❌ Form stays open

### Test 2: Invalid URL
**Steps:**
1. Click "Add Project"
2. Enter invalid URL (e.g., "not-a-url")
3. Click "Create Project"

**Expected:**
- ❌ Error toast: "Please enter a valid URL"
- ❌ Form stays open

### Test 3: No Tech Stack
**Steps:**
1. Click "Add Project"
2. Fill all fields except tech stack
3. Click "Create Project"

**Expected:**
- ❌ Error toast: "Please add at least one technology"
- ❌ Form stays open

---

## 📊 Console Debugging

### For each operation, check console for:
1. **CREATE Project:** Steps 1-10 ending with "CREATE PROJECT END"
2. **UPDATE Project:** Steps 1-9 ending with "UPDATE PROJECT END"
3. **DELETE Project:** Steps 1-8 ending with "DELETE PROJECT END"
4. **About UPDATE:** Steps 1-7 ending with "ABOUT UPDATE END"

### Error Format (if any):
```
ERROR details: {
  message: "...",
  code: "...",
  details: "...",
  hint: "..."
}
```

---

## ✅ Final Verification

- [ ] All CRUD operations work without errors
- [ ] All success toasts appear
- [ ] All changes persist after page refresh
- [ ] No console errors (except favicon 404)
- [ ] Loading states work correctly
- [ ] Modals open/close properly
- [ ] Data displays correctly in tables

---

## 🎉 Success Criteria

**All operations should:**
1. Complete in < 3 seconds
2. Show success message
3. Update UI immediately
4. Log detailed steps in console
5. Handle errors gracefully

**If any test fails:**
1. Check browser console for error details
2. Check Network tab for failed requests
3. Verify you're logged in as admin
4. Check Supabase dashboard for RLS policies
