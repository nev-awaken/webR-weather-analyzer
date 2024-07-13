
print("Input received in R:")
print(str(input))

timestamps <- input$timestamps
temperatures <- as.numeric(input$temperatures)

if (any(is.na(temperatures))) {
  stop("Temperatures contain NA values")
}

print(paste("Class of timestamps:", class(timestamps)))
print(paste("Class of temperatures:", class(temperatures)))
print(paste("Length of timestamps:", length(timestamps)))
print(paste("Length of temperatures:", length(temperatures)))
print("First few timestamps:")
print(head(timestamps))
print("First few temperatures:")
print(head(temperatures))

df <- data.frame(timestamp = timestamps, temperature = temperatures)

print("Structure of dataframe:")
print(str(df))

stats <- tryCatch({
  list(
    mean_temp = mean(df$temperature, na.rm = TRUE),
    median_temp = median(df$temperature, na.rm = TRUE),
    sd_temp = sd(df$temperature, na.rm = TRUE),
    min_temp = min(df$temperature, na.rm = TRUE),
    max_temp = max(df$temperature, na.rm = TRUE)
  )
}, error = function(e) {
  print(paste("Error in calculating statistics:", e$message))
  list(
    mean_temp = NA,
    median_temp = NA,
    sd_temp = NA,
    min_temp = NA,
    max_temp = NA
  )
})

print("Calculated statistics:")
print(str(stats))

result <- list(dataframe = df, statistics = stats)
toJSON(result, pretty = TRUE, auto_unbox = TRUE)