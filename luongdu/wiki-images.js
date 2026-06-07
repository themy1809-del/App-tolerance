/* Ảnh thật từ Wikipedia/Wikimedia Commons — đã verify URL hoạt động.
   Mapping defect.id → URL ảnh trực tiếp (lazy load qua <img>). */
window.LD_WIKI_IMG = {
  // === Welding cracks & defects ===
  'crack-cold': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Steel-with-Hydrogen-Induced-Cracks-01.jpg',
  'crack-hot':  'https://upload.wikimedia.org/wikipedia/commons/7/7e/Intergranular_Crack_SEM_Micrograph.jpg',
  'lamellar-tear': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Intergranular_Crack_SEM_Micrograph.jpg',

  // === Rust & corrosion ===
  'rust':        'https://upload.wikimedia.org/wikipedia/commons/f/fa/Rust_Bolt.JPG',
  'paint-rust-bleed': 'https://upload.wikimedia.org/wikipedia/commons/7/71/Corroded_metal_%28cropped%29.jpg',
  'mill-scale':  'https://upload.wikimedia.org/wikipedia/commons/a/ad/Eisenhammerschlag_Fe3_O4.jpg',

  // === Surface prep / painting ===
  'paint-pinhole':   'https://upload.wikimedia.org/wikipedia/commons/b/b3/Corrosion.Pit.jpg',
  'paint-adhesion':  'https://upload.wikimedia.org/wikipedia/commons/7/77/Riveted_corrosion.jpg',
  'paint-runs':      'https://upload.wikimedia.org/wikipedia/commons/9/92/Spraying_lacquer_on_cabinets_LCCN2016850642.jpg',

  // === Dim / measurement tools ===
  'dim-length-wrong':  'https://upload.wikimedia.org/wikipedia/commons/1/18/Caliper_detail_view.jpeg',
  'dim-twist':         'https://upload.wikimedia.org/wikipedia/commons/d/d5/Optical_Theodolite.jpg',
  'dim-baseplate':     'https://upload.wikimedia.org/wikipedia/commons/d/d5/Optical_Theodolite.jpg',

  // === NDE tools ===
  'lof':       'https://upload.wikimedia.org/wikipedia/commons/5/59/NDT_test_of_an_V2500_engine_blade_route.jpg',
  'lop':       'https://upload.wikimedia.org/wikipedia/commons/9/95/Ultrasonic_pipeline_test.jpg',
  'porosity':  'https://upload.wikimedia.org/wikipedia/commons/2/2a/RT_Film_Making_a_Radiograph.jpg',
  'slag-inclusion': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/RT_Film_Making_a_Radiograph.jpg',

  // === Gallery IDs (used in Tab D) ===
  'p-pinhole':   'https://upload.wikimedia.org/wikipedia/commons/b/b3/Corrosion.Pit.jpg',
  'p-peeling':   'https://upload.wikimedia.org/wikipedia/commons/7/71/Corroded_metal_%28cropped%29.jpg',
  'p-rust-bleed': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Riveted_corrosion.jpg',
  'p-sandblast': 'https://upload.wikimedia.org/wikipedia/commons/8/80/Sandblasting1.jpg',
  'd-caliper':   'https://upload.wikimedia.org/wikipedia/commons/1/18/Caliper_detail_view.jpeg',
  'd-micrometer':'https://upload.wikimedia.org/wikipedia/commons/c/c3/InsideCalipers.jpg',
  'd-theodolite':'https://upload.wikimedia.org/wikipedia/commons/d/d5/Optical_Theodolite.jpg',
  'n-ut':        'https://upload.wikimedia.org/wikipedia/commons/9/95/Ultrasonic_pipeline_test.jpg',
  'n-rt':        'https://upload.wikimedia.org/wikipedia/commons/2/2a/RT_Film_Making_a_Radiograph.jpg',
  'n-mt':        'https://upload.wikimedia.org/wikipedia/commons/6/62/Stress_corrosion_cracking_revealed_by_magnetic_particles.JPG'
};

console.log('LD_WIKI_IMG loaded:', Object.keys(window.LD_WIKI_IMG).length, 'verified Wikipedia URLs');
